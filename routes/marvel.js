const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const { search } = require("../controller/marvelController");

router.route("/search").get( auth, search);


module.exports = router;
