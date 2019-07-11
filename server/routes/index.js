var express = require("express");
var router = express.Router();
// All our API routes
const register = require("./register");
const login = require("./login");

router.use("/users/login", login);
router.use("/users", register);

module.exports = router;
