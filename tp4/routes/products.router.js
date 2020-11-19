const express = require("express");

const router = express.Router();

const validate = require("../validations/validator.middleware");
const validators = require("../validations/products.validations");
const productsController = require("../controllers/products.controller");
const { products } = require("../utils/constants/page-attributes");

const getSortingMethod = (criteria) => {
    const [arg, dir] = criteria.split("-");
    const attr = arg === "price" ? "price" : "name";
    const order = dir === "asc" ? 1 : -1;
    return [attr, order];
};

router.get("/", validate(validators.getProducts), async (req, res, next) => {
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

module.exports = router;
