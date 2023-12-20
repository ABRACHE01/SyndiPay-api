const ClientRepository = require('../../../repositories/ClientRepository');

class ClientSeeder {
  constructor() {
    this.clientRepository = new ClientRepository();
  }

  seed = async () => {
    try {
      const existingClients = await this.clientRepository.find();

      if (existingClients.length === 0) {
        const clients = [
          {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            phoneNumber: '1234567890',
            isActiveResident: true,
            CIN: 'JH1345',
          },
          {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'janesmith@example.com',
            phoneNumber: '9876543210',
            isActiveResident: true,
            CIN: 'JH1345',
          },
        ];

        const createdClients = await this.clientRepository.createMany(clients);
        console.log('Clients seeded successfully.');
      } else {
        console.log('Clients already exist. Seeder skipped.');
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = ClientSeeder;