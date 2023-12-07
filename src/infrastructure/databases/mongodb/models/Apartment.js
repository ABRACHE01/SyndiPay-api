const { Schema, model, models } = require("../mongoose");

const apartmentSchema = new Schema({

  photo: {
    type: String,
    default: null,
    },
  building: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    default: null,
  },
  ownerPhoneNumber: {
    type: String,
    default: null,
  },
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
},
{ timestamps: true }

);

const Apartment = models.Apartment || model("Apartment", apartmentSchema);

module.exports = Apartment;
