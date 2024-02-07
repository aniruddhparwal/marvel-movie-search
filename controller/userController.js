const User = require("../models/user");
const bigPromise = require("../middleware/bigPromise");
const cookieToken = require("../utils/cookieToken");

exports.signup = bigPromise(async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  console.log(req.body);
  if (!email || !name || !password || !phone) {
    return res.status(400).json({
      success: false,
      message: "name, email, password and phone is required",
    });
  }
  const userExist = await User.findOne({ phone });
  console.log(userExist)
  if (userExist) {
    return res.status(400).json({
      success: false,
      message: "User already exist",
    });
  }
  const user = await User.create({
    name,
    email,
    password,
    phone,
  });
  cookieToken(user, res);
});

exports.login = bigPromise(async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({
      success: false,
      message: "Please Provide phone and password",
    });
  }
  const user = await User.findOne({ phone }).select("+password");
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "phone or password may be incorrect",
    });
  }

  const isPasswordCorrect = await user.isValidatedPassword(password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      success: false,
      message: "phone or password may be incorrect",
    });
  }

  cookieToken(user, res);
});

exports.logout = bigPromise(async (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Logout Success",
    });
});
