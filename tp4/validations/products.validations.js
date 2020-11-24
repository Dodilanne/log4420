const Joi = require("joi");

const categories = ["cameras", "computers", "consoles", "screens"];
const criterias = ["alpha-asc", "alpha-dsc", "price-asc", "price-dsc"];

const get = Joi.object({
    category: Joi.valid(...categories),
    criteria: Joi.valid(...criterias),
});

const post = Joi.object({
    id: Joi.number().integer().positive().required(),
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    image: Joi.string().required(),
    category: Joi.valid(...categories).required(),
    description: Joi.string().required(),
    features: Joi.array().items(Joi.string().required()),
});

module.exports = {
    get,
    post,
};
