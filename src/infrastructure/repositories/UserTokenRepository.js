const BaseRepository = require("./BaseRepository");
const UserToken = require("../databases/mongodb/models/UserToken");

class UserTokenRepository extends BaseRepository {
  constructor() {
    super(UserToken);
  }
}

module.exports = UserTokenRepository;
