const express = require("express");

const router = express.Router();

const ordersController = require("../controllers/orders.controller");

router.get("/", async (req, res, next) => {
    try {
        res.json(await ordersController.get());
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        res.json(await ordersController.getByID({ orderID: req.params.id }));
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        res.json(await ordersController.create({ order: req.body }));
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        let result = await ordersController.deleteByID({ orderID: req.params.id});
        if (result.deletedCount != 0) {
            res.sendStatus(204);
            return;
        }
        res.sendStatus(404);
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

router.delete("/", async (req, res, next) => {
    try {
        ordersController.deleteAll().then(() => res.sendStatus(204));
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});
module.exports = router;
