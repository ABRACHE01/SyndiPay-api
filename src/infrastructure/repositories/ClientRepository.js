const BaseRepository = require("./BaseRepository");
const Client = require("../databases/mongodb/models/Client");
const Apartment = require("../databases/mongodb/models/Apartment")

class ClientRepository extends BaseRepository {
  constructor() {
    super(Client);
  }

  updateApartmentsOccupancyStatus = async (clientId) => {
    try {
      await Apartment.updateMany(
        { client: clientId, isDeleted: false },
        { $set: { isOccupied: false } }
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  
  softDelete = async (id) => {
    try {
      const deletedClient = await this.model.findByIdAndUpdate(
        id,
        { isDeleted: true , isActiveResident: false },
        { new: true }
      );
  
      await this.updateApartmentsOccupancyStatus(deletedClient._id);
  
      return deletedClient;
    } catch (error) {
      throw new Error(error);
    }
  };

  
}

module.exports = ClientRepository;

