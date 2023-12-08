const ApartmentServices = require("../../../adapters/services/apartment/ApartmentServices");

class DeleteApartmentUseCase {
  constructor() {
    this.apartmentServices = new ApartmentServices();
  }

  execute = async (apartmentId) => {
    try {
      await this.apartmentServices.deleteApartment(apartmentId);

      return {
        status: 200,
        message: "Apartment deleted successfully",
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

module.exports = DeleteApartmentUseCase;