const Joi = require("joi");

const apartmentSchema = Joi.object({
  photo: Joi.string().allow(null),
  name: Joi.string().required(),
  building: Joi.string().required(),
  client: Joi.string().allow(null),
  floor: Joi.number().required(),
  paymentAmount: Joi.number().required(),
  paymentFrequency: Joi.string().default("monthly"),
  paymentDueDate: Joi.number().default(1),
  addedBy: Joi.string().optional(),
});

module.exports = apartmentSchema;