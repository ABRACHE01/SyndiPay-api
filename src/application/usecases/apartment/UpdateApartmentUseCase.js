const ApartmentServices = require("../../../adapters/services/apartment/ApartmentServices");

class UpdateApartmentUseCase {
  constructor() {
    this.apartmentServices = new ApartmentServices();
  }

  execute = async (menuId, data) => {
    try {
      await this.apartmentServices.validateCreateApartment(data);
      const updateApartment = await this.apartmentServices.updateApartment(menuId, data);

      return {
        status: 200,
        message: "Apartment updated successfully",
        apartment: updateApartment,
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

module.exports = UpdateApartmentUseCase;



