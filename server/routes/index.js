var express = require("express");
var router = express.Router();
const passport = require("passport");

// All our API routes
const userRoutes = require("./users");
const shopRoutes = require("./shops").routes;

router.use("/users", userRoutes);
router.use("/shops",  passport.authenticate('jwt', {session: false}), shopRoutes);

module.exports = router;
