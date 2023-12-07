const BaseRepository = require("./BaseRepository");
const User = require("../databases/mongodb/models/User");
const Role = require("../databases/mongodb/models/Role");

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
    this.roleModel = Role;
  }

  create = async (data) => {
    const { roleNames, ...userCredentials } = data;
    try {
      const roles = await this.roleModel.find({ name: { $in: roleNames } });

      if (roles.length !== roleNames.length) {
        throw new Error("Role does not exist");
      }

      return await this.model.create({
        roles,
        ...userCredentials,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  createMany = async (data) => {
    try {
      const availableRoles = await this.roleModel.find();

      if (!availableRoles) {
        throw new Error("Roles do not exist");
      }

      const users = data.map((user) => {
        const { roleNames, ...userCredentials } = user;

        const roles = availableRoles.filter((role) =>
          roleNames.includes(role.name)
        );

        return {
          roles,
          ...userCredentials,
        };
      });

      return await this.model.insertMany(users);
    } catch (error) {
      throw new Error(error);
    }
  };

  findByEmail = async (email) => {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = UserRepository;
