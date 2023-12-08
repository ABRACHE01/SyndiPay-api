const BaseRepository = require("./BaseRepository");
const Payment = require("../databases/mongodb/models/Payment");

class PaymentRepository extends BaseRepository {
  constructor() {
    super(Payment);
  }

  findAll = async (includeDeleted = false) => {
    const query = includeDeleted ? {} : { isDeleted: false };
    try {
      return await this.model.find(query).populate("apartment");
    } catch (error) {
      throw new Error(error);
    }
  };

  findById = async (id, includeDeleted = false) => {
    const query = includeDeleted ? { _id: id } : { _id: id, isDeleted: false };
    try {
      return await this.model.findOne(query).populate("apartment");
    } catch (error) {
      throw new Error(error);
    }
  };

}

module.exports = PaymentRepository;
