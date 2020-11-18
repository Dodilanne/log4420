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
        router.get(path, async (_req, res, next) => {
            if (template === "products") {
                try {
                    payload.products = await productsController.find({
                        category: undefined,
                        sortingMethod: ["price", 1],
                    });
                } catch (e) {
                    next(e);
                }
            }
            res.render(route, payload);
        });
    });
});

module.exports = router;
