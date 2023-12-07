

class BaseRepository {
  constructor(model) {
    this.model = model;
  }
  
  findOne = async (conditions) => {
    try {
      return await this.model.findOne(conditions);
    } catch (error) {
      throw new Error(error);
    }
  };
  
  create = async (data) => {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  createMany = async (data) => {
    try {
      return await this.model.insertMany(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  findById = async (id, includeDeleted = false) => {
    const query = includeDeleted ? { _id: id } : { _id: id, isDeleted: false };
    try {
      return await this.model.findOne(query);
    } catch (error) {
      throw new Error(error);
    }
  };

  find = async (conditions = {}, includeDeleted = false) => {
    const query = includeDeleted
      ? conditions
      : { ...conditions, isDeleted: false };
    try {
      return await this.model.find(query);
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async (id, data) => {
    const existingDoc = await this.findById(id);
    try {
      if (existingDoc) {
        data.updatedAt = new Date();
        return await this.model.findByIdAndUpdate(id, data, { new: true });
      } else {
        throw new Error("Document not found or soft-deleted.");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  findAll = async (includeDeleted = false) => {
    const query = includeDeleted ? {} : { isDeleted: false };
    try {
      return await this.model.find(query);
    } catch (error) {
      throw new Error(error);
    }
  };
  
  softDelete = async (id) => {
    try {
      return await this.model.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  forceDelete = async (id) => {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  };
  
}

module.exports = BaseRepository;
