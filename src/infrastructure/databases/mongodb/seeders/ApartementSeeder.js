const ApartmentRepository = require('../../../repositories/ApartmentRepository');
const ClientRepository = require('../../../repositories/ClientRepository');
const ManagerRepository = require('../../../repositories/UserRepository');

class ApartmentSeeder {
  constructor() {
    this.apartmentRepository = new ApartmentRepository();
    this.clientRepository = new ClientRepository();
    this.managerRepository = new ManagerRepository();
  }

  seed = async () => {
    try {
      const existingApartments = await this.apartmentRepository.find();

      if (existingApartments.length === 0) {
        const clients = await this.clientRepository.find();
        const managers = await this.managerRepository.find();

        const apartments = [
          {
            name: 'Apartment 1',
            building: 'Building A',
            clients: [clients[0]._id], 
            floor: 2,
            paymentAmount: 1000,
            paymentFrequency: 'monthly',
            paymentDueDate: 1,
            isOccupied: true,
            addedBy: managers[0]._id,
          },
          {
            name: 'Apartment 2',
            building: 'Building B',
            clients: [clients[1]._id], 
            floor: 5,
            paymentAmount: 1500,
            paymentFrequency: 'monthly',
            paymentDueDate: 5,
            isOccupied: true,
            addedBy: managers[0]._id,
          },
        ];

        await this.apartmentRepository.createMany(apartments);
        console.log('Apartments seeded successfully.');
      } else {
        console.log('Apartments already exist. Seeder skipped.');
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = ApartmentSeeder;