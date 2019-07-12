var express = require("express");
var router = express.Router();
// All our API routes
const register = require("./register");
const login = require("./login");
const fetchShop = require("./mystore").fetchShop;

router.use("/users/login", login);
router.use("/users/mystore", fetchShop);
router.use("/users", register);

module.exports = router;
