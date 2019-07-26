var express = require("express");
var router = express.Router();

// All our API routes
router.use("/images", require("./images"));
router.use("/products", require("./products"));
router.use("/shops",  require("./shops").routes);
router.use("/users", require("./users"));
router.use("/cart", require("./checkout"));

module.exports = router;
