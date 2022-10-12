const Joi = require("joi");

const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
    subscription: Joi.string()
});

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
});

module.exports = {
    registerSchema,
    loginSchema
}