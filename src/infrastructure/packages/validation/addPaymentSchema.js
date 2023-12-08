const Joi = require("joi");

const addPaymentSchema = Joi.object({
  apartment: Joi.string().required(),
  amount: Joi.number().required(),
  paymentDate: Joi.date().required(),
  paymentMethod: Joi.string().required(),
  isPaid: Joi.boolean(),
  receiptNumber: Joi.string().allow(null),
  notes: Joi.string().allow(null),
});

module.exports = addPaymentSchema;