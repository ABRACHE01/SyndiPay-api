const Joi = require("joi");

const updatePaymentSchema = Joi.object({
  apartment: Joi.string(),
  amount: Joi.number(),
  paymentDate: Joi.date(),
  paymentMethod: Joi.string(),
  isPaid: Joi.boolean(),
  receiptNumber: Joi.string().allow(null),
  notes: Joi.string().allow(null),
});

module.exports = updatePaymentSchema;