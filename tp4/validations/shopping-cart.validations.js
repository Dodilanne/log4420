const Joi = require("joi");

const post = Joi.object({
    quantity: Joi.number().positive().required(),
    productId: Joi.number().positive().required(),
});

const putID = Joi.object({
    quantity: Joi.number().positive().required(),
});

module.exports = {
    post,
    putID,
};
