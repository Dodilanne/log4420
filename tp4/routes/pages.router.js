const express = require("express");

const router = express.Router();

const productsController = require("../controllers/products.controller");
const pages = require("../utils/constants/page-attributes");

Object.keys(pages).forEach((template) => {
    const { title, paths, additionalScripts } = pages[template];
    paths.forEach((path) => {
        const route = `pages/${template}`;
        const payload = {
            title,
            additionalScripts,
            pageName: template,
        };
        router.get(path, async (req, res, next) => {
            try {
                if (template === "products") {
                    payload.products = await productsController.find({
                        category: undefined,
                        sortingMethod: ["price", 1],
                    });
                    if (!payload.products) throw new Error("Not found");
                } else if (template === "product") {
                    const { productID } = req.params;
                    payload.product = await productsController.findOneByID(
                        productID
                    );
                    if (!payload.product) throw new Error("Not found");
                }
                res.render(route, payload);
            } catch (e) {
                res.sendStatus(404);
            }
        });
    });
});

module.exports = router;
