var express = require("express");
var router = express.Router();
const passport = require("passport");

// All our API routes
const shopProtectedRoutes = require("./shops").protectedRoutes;
const shopPublicRoutes = require("./shops").publicRoutes;
const userRoutes = require("./users");

router.use("/shops",  passport.authenticate('jwt', {session: false}), shopProtectedRoutes);
router.use("/shops",  shopPublicRoutes);
router.use("/users", userRoutes);

module.exports = router;
