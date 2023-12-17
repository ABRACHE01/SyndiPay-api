const Joi = require("joi");

const updateClientSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  CIN: Joi.string(),
  isDeleted: Joi.boolean().default(false),
  isActiveResident: Joi.boolean().default(true),
});

module.exports = updateClientSchema;