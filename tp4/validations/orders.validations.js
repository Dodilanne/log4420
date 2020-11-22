const Joi = require("joi");
// @ts-ignore
const PhoneJoi = Joi.extend(require("joi-phone-number"));

const post = Joi.object({
    id: Joi.number().integer().positive().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: PhoneJoi.string().regex(new RegExp(/^(1-)?\d{3}-\d{3}-\d{4}$/)).required(),
    products: Joi.array().items(
        Joi.object({
            id: Joi.number().integer().positive().required(),
            quantity: Joi.number().positive().required(),
        }).required()
    ),
});

module.exports = {
    post,
};
