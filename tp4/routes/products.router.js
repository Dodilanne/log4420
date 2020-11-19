const express = require("express");

const router = express.Router();

const validate = require("../validations/validator.middleware");
const validators = require("../validations/products.validations");
const productsController = require("../controllers/products.controller");

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
        res.json(products);
    } catch (e) {
        console.log(e.message);
        next(e);
    }
});

module.exports = router;
