var express = require("express");
var router = express.Router();
const passport = require("passport")

// All our API routes
const register = require("./register");
const login = require("./login");
const fetchShop = require("./mystore").fetchShop;
const ping = require("./ping");

router.use("/users/login", login);
// router.use("/users/mystore",  ensureAuthenticatedWithRedirect, passport.authenticate('jwt', {session: false}), fetchShop);
router.use("/users/mystore", passport.authenticate('jwt', {session: false}), fetchShop);

router.use("/users", register);
module.exports = router;
