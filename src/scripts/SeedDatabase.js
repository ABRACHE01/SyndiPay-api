const RoleSeeder = require("../infrastructure/databases/mongodb/seeders/RoleSeeder");
const ManagerSeeder = require("../infrastructure/databases/mongodb/seeders/ManagerSeeder");
const ApartementSeeder = require("../infrastructure/databases/mongodb/seeders/ApartementSeeder");

const roleSeeder = new RoleSeeder();
const managerSeeder = new ManagerSeeder();
const apartementSeeder = new ApartementSeeder();

const seedDatabase = async () => {
  try {

    await roleSeeder.seed();
    await managerSeeder.seed();
    await apartementSeeder.seed();

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedDatabase();
