const Joi = require("joi");

const getProducts = Joi.object({
    category: Joi.valid("cameras", "computers", "consoles", "screens"),
    criteria: Joi.valid("alpha-asc", "alpha-dsc", "price-asc", "price-dsc"),
});

module.exports = {
    getProducts,
};
