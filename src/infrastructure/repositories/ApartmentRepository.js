const BaseRepository = require("./BaseRepository");
const Apartment = require("../databases/mongodb/models/Apartment");
const Client = require("../databases/mongodb/models/Client");

class ApartmentRepository extends BaseRepository {
  constructor() {
    super(Apartment);
  }
  
  updateClientisActiveResident = async (apartmentId) => {
    try {
      const apartment = await Apartment.findById(apartmentId);
      const clientId = apartment.clients[0]; 
  
      if (clientId) {
        await Client.findByIdAndUpdate(
          clientId,
          { isActiveResident: false },
          { new: true }
        );
      }
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
      .populate({
        path: "clients",
        match: { isActiveResident: true },
      })      
      .populate("addedBy", "firstName lastName email")
    } catch (error) {
      throw new Error(error);
    }
  };

  findById = async (id, includeDeleted = false) => {
    const query = includeDeleted ? { _id: id } : { _id: id, isDeleted: false };
    try {
      return await this.model.findOne(query).populate("clients");
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (data) => {
    try {
      const apartment = await this.model.create(data);
      const clientId = apartment.clients[0];
      if (clientId) {
        await Client.findByIdAndUpdate(
          clientId,
          { isActiveResident: true },
          { new: true }
        );
      }
      await this.model.findByIdAndUpdate(
        apartment._id,
        { isOccupied: true },
        { new: true }
      );
  
      return apartment;
    } catch (error) {
      throw new Error(error);
    }
  };

}

module.exports = ApartmentRepository;


