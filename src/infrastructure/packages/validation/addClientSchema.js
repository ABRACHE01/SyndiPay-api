const Joi = require("joi");

const addClientSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    CIN: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    isDeleted: Joi.boolean().default(false),
    isActiveResident: Joi.boolean().default(true),
});

module.exports = addClientSchema;