const {Schema , model , models } = require('../mongoose')


const clientSchema = new Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      CIN: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      isActiveResident:{
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  );
  
  const Client = models.Client || model("Client", clientSchema);
  
  module.exports = Client;