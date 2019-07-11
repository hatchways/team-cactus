var express = require("express");
var router = express.Router();
// All our API routes
const register = require("./register");
const login = require("./login");

router.use("/register", register);
router.use("/login", login);

module.exports = router;
