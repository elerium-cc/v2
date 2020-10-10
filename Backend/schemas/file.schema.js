const Joi = require("joi");

module.exports = Joi.object({
    showUrl: Joi.boolean(),
    fakeUrl: Joi.string()
        .when("showUrl", { is: Joi.exist(), then: Joi.forbidden() })
        .messages({
            ["any.unknown"]: "Only 1 url option per once"
        }),
    domain: Joi.string()
});