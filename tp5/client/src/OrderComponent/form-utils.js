import Joi from 'joi';

export const validationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phone: Joi.string()
    .custom((value, helper) => {
      value = value.replace(/\s+/g, '');
      const isValid =
        value.length > 9 &&
        !!value.match(
          /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]\d{2}-?\d{4}$/
        );
      return isValid ? value : helper.message('Bad phone number');
    })
    .required(),
  creditCard: Joi.string().creditCard().required(),
  expiry: Joi.string()
    .regex(/^(0[1-9]|1[0-2])\/(0[0-9]|[1-9][0-9])$/)
    .required(),
});
