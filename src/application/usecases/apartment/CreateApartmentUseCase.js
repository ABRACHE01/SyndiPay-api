const ApartmentServices = require("../../../adapters/services/apartment/ApartmentServices");

class CreateApartmentUseCase {
  constructor() {
    this.apartmentServices = new ApartmentServices();
  }

  execute = async (data) => {
    try {
      await this.apartmentServices.validateCreateApartment(data);

      const createdApartment = await this.apartmentServices.createApartment(data);

      return {
        status: 200,
        message: "Apartment created successfully",
        apartment: createdApartment,
      };
    } catch (error) {
      console.log(error);
      return {
        status: error.status || 500,
        message: error.message || "Something went wrong, please try again",
      };
    }
  };
}

module.exports = CreateApartmentUseCase;