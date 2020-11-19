const middleware = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
        res.sendStatus(400);
    } else {
        next();
    }
};

module.exports = middleware;
