const express = require("express");

const router = express.Router();

const products = require("./products.router");

const shopping_cart = require("./shopping-cart.router");

router.use("/products", products);
router.use("/shopping-cart", shopping_cart);

module.exports = router;
