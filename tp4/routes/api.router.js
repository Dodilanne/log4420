const express = require("express");

const router = express.Router();

const products = require("./products.router");

router.use("/products", products);

module.exports = router;
