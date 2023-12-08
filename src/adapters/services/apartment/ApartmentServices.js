const ApartmentRepository = require("../../../infrastructure/repositories/ApartmentRepository");
const validateData = require("../../../infrastructure/helpers/validateData");

class ApartmentServices {
  constructor() {
    this.apartmentRepository = new ApartmentRepository();
    this.validateData = validateData;
  }
  
  createApartment = async (data) => {
    const apartment = await this.apartmentRepository.create(data);

    if (!apartment) {
      const error = new Error("Apartment could not be created");
      error.status = 500;

      throw error;
    }

    return apartment;
  };

  getApartmentById = async (apartmentId) => {
    const apartment = await this.apartmentRepository.findById(apartmentId);

    if (!apartment) {
      const error = new Error("Apartment not found");
      error.status = 404;

      throw error;
    }

    return apartment;
  };

  updateApartment = async (apartmentId, data) => {
    const apartment = await this.apartmentRepository.findById(apartmentId);

    if (!apartment) {
      const error = new Error("Apartment not found");
      error.status = 404;

      throw error;
    }

    const updatedApartment = await this.apartmentRepository.update(apartmentId, data);

    return updatedApartment;
  };

  deleteApartment = async (apartmentId) => {
    const apartment = await this.apartmentRepository.findById(apartmentId);
    if (!apartment) {
      const error = new Error("Apartment not found");
      error.status = 404;

      throw error;
    }

    await this.apartmentRepository.softDelete(apartmentId);
  };
  
  getAllApartments = async () => {
    const apartments = await this.apartmentRepository.findAll();

    return apartments;
  };
  
  validateCreateApartment = async (data) => {
    const { error: validationError } = this.validateData(
      data,
      "addApartment"
    );

    if (validationError) {
      const error = new Error(validationError.message);
      error.status = validationError.status;

      throw error;
    }
  }
  
  validateUpdateApartment = async (data) => {
    const { error: validationError } = this.validateData(
      data,
      "updateApartment"
    );

    if (validationError) {
      const error = new Error(validationError.message);
      error.status = validationError.status;

      throw error;
    }
  }

}

module.exports = ApartmentServices;