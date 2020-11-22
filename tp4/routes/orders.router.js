const express = require("express");

const router = express.Router();

const { validateBody } = require("../validations/validator.middleware");
const validators = require("../validations/orders.validations");
const ordersController = require("../controllers/orders.controller");
const productsController = require("../controllers/products.controller");

router.get("/", async (req, res, next) => {
    try {
        const orders = await ordersController.get();
        res.json(orders || []);
    } catch (e) {
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        let order = await ordersController.getByID(req.params.id);
        if (order) {
            res.json(order);
        }
        res.sendStatus(404);
    } catch (e) {
        next(e);
    }
});

router.post("/", validateBody(validators.post), async (req, res, next) => {
    try {
        const { id } = req.body;
        const order = await ordersController.getByID(id);
        if (!!order) res.sendStatus(400);
        const products = await productsController.find();
        const allProductsExist = req.body.products.every(
            ({ id }) => products.findIndex((product) => product.id == id) > -1
        );
        if (!allProductsExist) res.sendStatus(400);
        await ordersController.create(req.body);
        req.session.order = req.body;
        res.status(201).json(req.body);
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await ordersController.deleteByID(id);
        res.sendStatus(result.deletedCount != 0 ? 204 : 404);
    } catch (e) {
        next(e);
    }
});

router.delete("/", async (req, res, next) => {
    try {
        ordersController.deleteAll().then(() => res.sendStatus(204));
    } catch (e) {
        next(e);
    }
});
module.exports = router;
