const middleware = (schema, reqKey) => (req, res, next) => {
    const { error } = schema.validate(req[reqKey]);
    if (error) {
        console.log(error.message);
        res.sendStatus(400);
        return;
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
