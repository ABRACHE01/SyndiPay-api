const BaseRepository = require("./BaseRepository");
const Apartment = require("../databases/mongodb/models/Apartment");

class ApartmentRepository extends BaseRepository {
  constructor() {
    super(Apartment);
  }

  findAll = async (includeDeleted = false, restaurantId) => {
    const query = includeDeleted ? {} : { isDeleted: false, restaurantId: restaurantId };
    try {
      return await this.model.find(query);
    } catch (error) {
      throw new Error(error);
    }
  };

}

module.exports = ApartmentRepository;


