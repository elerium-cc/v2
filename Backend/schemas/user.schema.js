const Joi = require("joi");

module.exports = Joi.object({
    username: Joi.string()
        .required()
        .token()
        .max(20)
});