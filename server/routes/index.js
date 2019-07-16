var express = require("express");
var router = express.Router();

// All our API routes
router.use("/products", require("./products"));
router.use("/shops",  require("./shops").routes);
router.use("/users", require("./users"));

module.exports = router;
