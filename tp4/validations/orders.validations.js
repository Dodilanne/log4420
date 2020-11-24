const Joi = require("joi");
const { trim } = require("jquery");
// @ts-ignore
const PhoneJoi = Joi.extend(require("joi-phone-number"));

const post = Joi.object({
    id: Joi.number().integer().positive().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    // phone: PhoneJoi.string().regex(new RegExp(/^(1-)?\d{3}-?\d{3}-?\d{4}$/)).required(),
    phone: PhoneJoi.string()
        .custom((value, helper) => {
            value = value.replace(/\s+/g, "");
            const isValid =
                value.length > 9 &&
                !!value.match(
                    /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]\d{2}-?\d{4}$/
                );
            return isValid || helper.message("Bad phone number");
        })
        .required(),
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
