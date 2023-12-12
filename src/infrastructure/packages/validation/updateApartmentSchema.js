const Joi = require("joi");

const updateApartmentSchema = Joi.object({
  photo: Joi.string().allow(null),
  name: Joi.string().required(),
  building: Joi.string(),
  client: Joi.string().allow(null),
  floor: Joi.number(),
  paymentAmount: Joi.number(),
  paymentFrequency: Joi.string().default("monthly"),
  paymentDueDate: Joi.number().default(1),
});

module.exports = updateApartmentSchema;