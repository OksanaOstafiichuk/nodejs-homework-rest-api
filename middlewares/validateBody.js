const { RequestError } = require('../helpers');

const validateBody = (schema) => {
    const fn = (req, res, next) => {
        const validationResult = schema.validate(req.body);

        if (validationResult.error) {
            next(RequestError(400, validationResult.error.message));
        }
        next();
    }
    return fn;
}

module.exports = validateBody;