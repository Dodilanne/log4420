const express = require("express");

const router = express.Router();

const { validateBody } = require("../validations/validator.middleware");
const validators = require("../validations/shopping-cart.validations");
const productsController = require("../controllers/products.controller");

const isInvalidQuantity = (quantity) => isNaN(quantity) || quantity < 1;
const isInvalidProductID = async (productId) =>
    isNaN(productId) || !(await productsController.findOneByID(productId));

router.get("/", async (req, res, next) => {
    res.json(req.session.cart || []);
});

router.get("/:productId", async (req, res, next) => {
    try {
        if (req.session.cart) {
            let product = req.session.cart.find(
                (item) => item.productId == req.params.productId
            );
            if (product) {
                res.json(product);
                return;
            }
        }
        res.sendStatus(404);
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

router.post("/", validateBody(validators.post), async (req, res, next) => {
    try {
        let session = req.session;
        if (!session.cart) session.cart = [];
        const dbProduct = await productsController.findOneByID(
            req.body.productId
        );
        if (!dbProduct) res.sendStatus(400);
        let product = session.cart.find(
            (item) => item.productId == req.body.productId
        );
        if (product) {
            res.sendStatus(400);
        }
        session.cart.push(req.body);
        res.sendStatus(201);
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

router.put(
    "/:productId",
    validateBody(validators.putID),
    async (req, res, next) => {
        try {
            let session = req.session;
            if (session.cart) {
                let product = session.cart.find(
                    (item) => item.productId == req.params.productId
                );
                if (product) {
                    product.quantity = req.body.quantity;
                    res.sendStatus(204);
                }
            }
            res.sendStatus(404);
        } catch (e) {
            console.log(e.message);
            next(e);
        }
    }
);

router.delete("/:productId", async (req, res, next) => {
    try {
        let session = req.session;
        if (session.cart) {
            let index = session.cart.findIndex(
                (item) => item.productId == req.params.productId
            );
            if (index > -1) {
                session.cart.splice(index, 1);
                res.sendStatus(204);
                return;
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
