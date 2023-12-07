const ApartmentRepository = require('../../../repositories/ApartmentRepository');

class ApartmentSeeder {
  constructor() {
    this.apartmentRepository = new ApartmentRepository();
  }

  seed = async () => {
    try {
      const existingApartments = await this.apartmentRepository.find();

      if (existingApartments.length === 0) {
        const apartments = [
          {
            name: 'Apartment 1',
            building: 'Building A',
            owner: 'John Doe',
            ownerPhoneNumber: '1234567890',
            floor: 2,
            paymentAmount: 1000,
            paymentFrequency: 'monthly',
            paymentDueDate: 1,
          },
          {
            name: 'Apartment 2',
            building: 'Building B',
            owner: 'Jane Smith',
            ownerPhoneNumber: '9876543210',
            floor: 5,
            paymentAmount: 1500,
            paymentFrequency: 'monthly',
            paymentDueDate: 5,
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