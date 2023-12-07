class User {
  constructor({
    id,
    firstName,
    lastName,
    email,
    password,
    image = null,
    phoneNumber = null,
    address = null,
    roles,
    isVerified = false,
    isBanned = false,
    createdAt = new Date(),
    updatedAt = new Date(),
    isDeleted = false,
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.image = image;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.roles = roles;
    this.isVerified = isVerified;
    this.isBanned = isBanned;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
  }
}

module.exports = User;
