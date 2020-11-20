const express = require("express");

const router = express.Router();

const products = require("./products.router");
const shopping_cart = require("./shopping-cart.router");
const orders = require("./orders.router");

router.use("/products", products);
router.use("/shopping-cart", shopping_cart);
router.use("/orders", orders);

module.exports = router;
