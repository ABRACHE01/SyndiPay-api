const RoleSeeder = require("../infrastructure/databases/mongodb/seeders/RoleSeeder");
const ManagerSeeder = require("../infrastructure/databases/mongodb/seeders/ManagerSeeder");
const ApartementSeeder = require("../infrastructure/databases/mongodb/seeders/ApartementSeeder");
const ClientSeeder = require("../infrastructure/databases/mongodb/seeders/ClientSeeder");
const PaymentSeeder = require("../infrastructure/databases/mongodb/seeders/PaymentSeeder");

const roleSeeder = new RoleSeeder();
const managerSeeder = new ManagerSeeder();
const apartementSeeder = new ApartementSeeder();
const paymentSeeder = new PaymentSeeder();
const clientSeeder = new ClientSeeder();

const seedDatabase = async () => {
  try {

    await roleSeeder.seed();
    await managerSeeder.seed();
    await clientSeeder.seed();
    await apartementSeeder.seed();
    await paymentSeeder.seed();

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedDatabase();
