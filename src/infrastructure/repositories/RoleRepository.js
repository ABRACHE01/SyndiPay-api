const BaseRepository = require("./BaseRepository");
const Role = require("../databases/mongodb/models/Role");

class RoleRepository extends BaseRepository {
  constructor() {
    super(Role);
  }
}

module.exports = RoleRepository;
