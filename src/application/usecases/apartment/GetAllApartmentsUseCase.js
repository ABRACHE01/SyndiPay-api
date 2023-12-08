const ApartmentServices = require("../../../adapters/services/apartment/ApartmentServices");

class GetAllApartmentsUseCase {
  constructor() {
    this.apartmentServices = new ApartmentServices();
  }

  execute = async () => {
    try {
      const apartments = await this.apartmentServices.getAllApartments();

      return {
        status: 200,
        message: "Apartments retrieved successfully",
        apartments: apartments,
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

module.exports = GetAllApartmentsUseCase;