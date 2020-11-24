const express = require("express");

const router = express.Router();

const productsController = require("../controllers/products.controller");
const pages = require("../utils/constants/page-attributes");

const getCartQuantity = (cart) =>
    cart.reduce((total, { quantity }) => total + quantity, 0);

Object.keys(pages).forEach((template) => {
    const { title, paths, additionalScripts, action } = pages[template];
    paths.forEach((path) => {
        router[action || "get"](path, async function (req, res, next) {
            const route = `pages/${template}`;
            const { cart } = req.session;
            const payload = {
                title,
                cart: cart || [],
                additionalScripts,
                pageName: template,
                cartQuantity: cart ? getCartQuantity(cart) : 0,
            };
            try {
                switch (template) {
                    case "products":
                    case "shopping-cart":
                        payload.products = await productsController.find({
                            category: undefined,
                            sortingMethod: { price: 1 },
                        });
                        if (!payload.products) throw new Error("Not found");
                        break;
                    case "product":
                        const { productID } = req.params;
                        payload.product = await productsController.findOneByID(
                            productID
                        );
                        if (!payload.product) throw new Error("Not found");
                        break;
                    case "confirmation":
                        payload.order = req.session.order;
                }
                res.render(route, payload);
            } catch (e) {
                res.sendStatus(404);
            }
        });
    });
});

module.exports = router;
