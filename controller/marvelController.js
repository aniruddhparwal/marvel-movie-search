const { default: axios } = require("axios");
const bigPromise = require("../middleware/bigPromise");

const ts = new Date().getTime();
const hash = require("crypto")
  .createHash("md5")
  .update(
    `${ts}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`
  )
  .digest("hex");

const marvelApi = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
});

async function getCharacters(query = null) {
  try {
    let params = { apikey: process.env.MARVEL_PUBLIC_KEY, ts: ts, hash: hash };
    if (query) {
      params.nameStartsWith = query;
    }else{
      params.limit = 20;
    }

    const response = await marvelApi.get(`characters`, {
      params,
    });

    return response.data.data.results;
  } catch (error) {
    console.error("marvelController | Error fetching characters:", error.message);
    return null;
  }
}

exports.search = bigPromise(async (req, res, next) => {
  const { q } = req.query; // q is the query parameter
  const data = await getCharacters(q);

  if (!data) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

  let resultArr = [];

  data.forEach(element => {
    resultArr.push(element.name);
  });

  res.status(200).json({
    status: "success",
    data: resultArr,
  });
});
