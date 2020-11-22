const middleware = (schema, reqKey) => (req, res, next) => {
    const { error } = schema.validate(req[reqKey]);
    if (error) {
        res.sendStatus(400);
    } else {
        next();
    }
};

const validateQuery = (schema) => middleware(schema, "query");
const validateBody = (schema) => middleware(schema, "body");
const validateParams = (schema) => middleware(schema, "params");

module.exports = {
    validateQuery,
    validateBody,
    validateParams,
};
