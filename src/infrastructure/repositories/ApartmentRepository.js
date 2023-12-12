const BaseRepository = require("./BaseRepository");
const Apartment = require("../databases/mongodb/models/Apartment");

class ApartmentRepository extends BaseRepository {
  constructor() {
    super(Apartment);
  }
  
  updateApartmentsOccupancyStatus = async (clientId) => {
    try {
      const apartment = await Apartment.findOneAndUpdate(
        { client: clientId, isDeleted: false },
        { $set: { isOccupied: false } },
        { new: true }
      );
  
      return apartment;
    } catch (error) {
      throw new Error(error);
    }
  };

  softDelete = async (id) => {
    try {
      const deletedapartment = await this.model.findByIdAndUpdate(
        id,
        { isDeleted: true , isOccupied: false },
        { new: true }
      );

      await this.updateClientisActiveResident(deletedapartment._id);
  
      return deletedapartment;
    } catch (error) {
      throw new Error(error);
    }
  };

  findAll = async (includeDeleted = false) => {
    const query = includeDeleted ? {} : { isDeleted: false };
    try {
      return await this.model.find(query)
      .populate("client")
      .populate("addedBy", "firstName lastName email")
    } catch (error) {
      throw new Error(error);
    }
  };

  findById = async (id, includeDeleted = false) => {
    const query = includeDeleted ? { _id: id } : { _id: id, isDeleted: false };
    try {
      return await this.model.findOne(query).populate("client");
    } catch (error) {
      throw new Error(error);
    }
  };

}

module.exports = ApartmentRepository;


