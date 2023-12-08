const BaseRepository = require("./BaseRepository");
const Apartment = require("../databases/mongodb/models/Apartment");

class ApartmentRepository extends BaseRepository {
  constructor() {
    super(Apartment);
  }


}

module.exports = ApartmentRepository;


