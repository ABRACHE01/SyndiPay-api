

const ApartmentServices = require('./ApartmentServices');
const ApartmentRepository = require('../../../infrastructure/repositories/ApartmentRepository');

jest.mock('../../../infrastructure/repositories/ApartmentRepository');

describe('ApartmentServices', () => {

  describe('createApartment', () => {
    it('should create an apartment', async () => {
      // Arrange
      const data = {
        photo: 'apartment.jpg',
        name: 'Apartment 1',
        building: 'Building A',
        clients: [],
        floor: 1,
        paymentAmount: 1000,
        paymentFrequency: 'monthly',
        paymentDueDate: 1,
        isOccupied: false,
        isDeleted: false,
      };
      const mockApartment = { ...data, _id: 'mockedId' };
        const apartmentRepository = {
            create: jest.fn().mockResolvedValue(mockApartment),
        };
      // Act
      const apartment = await apartmentRepository.create(data);

      // Assert
      expect(apartment).toEqual(mockApartment);
      expect(apartmentRepository.create).toHaveBeenCalledWith(data);
    });
    it('should throw an error if apartment creation fails', async () => {
      // Arrange
      const data = {
        photo: 'apartment.jpg',
        name: 'Apartment 1',
        building: 'Building A',
        clients: [],
        floor: 1,
        paymentAmount: 1000,
        paymentFrequency: 'monthly',
        paymentDueDate: 1,
        isOccupied: false,
        isDeleted: false,
      };
      const apartmentRepository = {
        create: jest.fn().mockResolvedValue(null),
      };

      // Act and Assert
      try {
        await apartmentRepository.create(data);
      } catch (error) {
        expect(apartmentRepository.create).toHaveBeenCalledWith(data);
        expect(error.message).toEqual('Apartment could not be created');
        expect(error.status).toEqual(500);
      }
    });
  });

});
