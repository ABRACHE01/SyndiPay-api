const { Schema, model, models } = require("../mongoose");

const apartmentSchema = new Schema(
  {
    photo: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
    clients: [{
      type: Schema.Types.ObjectId,
      ref: "Client", 
      default: null,
    }],
    floor: {
      type: Number,
      required: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    paymentFrequency: {
      type: String,
      default: "monthly",
    },
    paymentDueDate: {
      type: Number,
      default: 1,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isOccupied: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Apartment = models.Apartment || model("Apartment", apartmentSchema);

module.exports = Apartment;