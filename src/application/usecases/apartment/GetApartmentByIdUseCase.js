const ApartmentServices = require("../../../adapters/services/apartment/ApartmentServices");

class GetApartmentByIdUseCase {
  constructor() {
    this.apartmentServices = new ApartmentServices();
  }

  execute = async (apartmentId) => {
    try {
      const apartment = await this.apartmentServices.getApartmentById(apartmentId);

      return {
        status: 200,
        message: "Apartment retrieved successfully",
        apartment: apartment,
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

module.exports = GetApartmentByIdUseCase;