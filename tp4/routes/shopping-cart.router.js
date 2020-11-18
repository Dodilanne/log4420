const express = require("express");

const router = express.Router();

const ordersController = require("../controllers/orders.controller");

router.get("/", async (req, res, next) => {
    try {
       
       res.json(
        await ordersController.get({orderID : req.session.orderID})
       );
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

module.exports = router;
