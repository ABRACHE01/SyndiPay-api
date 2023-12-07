const RoleRepository = require("../../../repositories/RoleRepository");

class RoleSeeder {
  constructor() {
    this.roleRepository = new RoleRepository();
  }

  seed = async () => {
    try {
      const existingRoles = await this.roleRepository.find();

      if (existingRoles.length === 0) {
        const roles = [
          { name: "manager" },
        ];
        await this.roleRepository.createMany(roles);
        console.log("Roles collection seeded successfully.");
      } else {
        console.log("Roles collection already has data. Seeder skipped.");
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = RoleSeeder;
