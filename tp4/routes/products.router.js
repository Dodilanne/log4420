const express = require("express");

const router = express.Router();

const {
    validateQuery,
    validateBody,
} = require("../validations/validator.middleware");
const validators = require("../validations/products.validations");
const productsController = require("../controllers/products.controller");

const getSortingMethod = (criteria) => {
    const [arg, dir] = criteria.split("-");
    const attr = arg === "price" ? "price" : "name";
    const order = dir === "asc" ? 1 : -1;
    return { [attr]: order };
};

router.get("/", validateQuery(validators.get), async (req, res, next) => {
    try {
        const { criteria, category } = req.query;
        const sortingMethod = getSortingMethod(criteria || "price-asc");
        const products = await productsController.find({
            category,
            sortingMethod,
        });
        res.status(200).json(products);
    } catch (e) {
        next(e);
    }
});

router.get("/:productID", async (req, res, next) => {
    try {
        const { productID } = req.params;
        const product = await productsController.findOneByID(productID);
        if (!product) throw new Error("Not found");
        res.status(200).json(product);
    } catch (e) {
        res.sendStatus(404);
    }
});

router.post("/", validateBody(validators.post), async (req, res, next) => {
    try {
        console.log("WUUUT");
        const { id } = req.body;
        const product = await productsController.findOneByID(id);
        if (!!product) return res.sendStatus(400);
        await productsController.create(req.body);
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(400);
    }
});

router.delete("/:productID", async (req, res, next) => {
    try {
        const { productID } = req.params;
        const product = await productsController.findOneByID(productID);
        if (!product) return res.sendStatus(404);
        await productsController.deleteOne(productID);
        res.sendStatus(204);
    } catch (e) {
        res.sendStatus(404);
    }
});

router.delete("/", async (req, res, next) => {
    try {
        await productsController.deleteAll();
        res.sendStatus(204);
    } catch (e) {
        res.sendStatus(e.status);
    }
});

// Fills db with products.json file values
router.post("/populate", async (req, res, next) => {
    try {
        await productsController.fillWithDefaults();
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(e.status);
    }
});

module.exports = router;
