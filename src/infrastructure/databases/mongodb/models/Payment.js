const { Schema, model, models } = require("../mongoose");

const paymentSchema = new Schema(
  {
    apartment: {
      type: Schema.Types.ObjectId,
      ref: 'Apartment'
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    receiptNumber: {
      type: String,
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Payment = models.Payment || model("Payment", paymentSchema);

module.exports = Payment;