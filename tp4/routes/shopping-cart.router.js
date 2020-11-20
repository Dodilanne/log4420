const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        res.json(req.session.cart);
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

router.get("/:productID", async (req, res, next) => {
    try {
        if (req.session.cart) {
            let product = req.session.cart.find(
                (item) => item.productID == req.params.productID
            );
            if (product) res.json(product);
        }
        res.sendStatus(404);
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        let session = req.session;
        if (!session.cart) session.cart = [];
        session.cart.push(req.body);
        res.json(req.session.cart);
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

router.put("/:productID", async (req, res, next) => {
    try {
        let session = req.session;
        if (session.cart) {
            let product=session.cart.find((item) => item.productID === req.params.productID )
            if ( product){
                product.quantity = req.body.quantity;
                res.sendStatus(204);
            }
        }
        res.sendStatus(404);
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

router.delete("/:productID", async (req, res, next) => {
    try {
        let session = req.session;
        if (session.cart) {
            let index = session.cart.findIndex((item) => item.productID === req.params.productID);
            if ( index ){
                session.cart.splice(index,1);
            }
        }
        res.sendStatus(404);
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

router.delete("/", async (req, res, next) => {
    try {
        delete req.session.cart;
        res.sendStatus(204);
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

module.exports = router;
