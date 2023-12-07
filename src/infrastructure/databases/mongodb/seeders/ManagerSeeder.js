const bcrypt = require('bcryptjs');
const { exist } = require('joi');
const UserRepository = require('../../../repositories/UserRepository');

class ManagerSeeder {
  constructor() {
    this.userRepository = new UserRepository();
  }

  seed = async () => {
    try {
      const existingManager = await this.userRepository.find({
        roles: { $in: ['superadmin'] },
      });

      if (existingManager.length === 0) {
        const manager = {
          firstName: 'Bouchaib',
          lastName: 'lhday',
          email: 'manager@manager.com',
          password: 'manager00',
          roleNames: ['manager'],
        };

        // Hash the password
        const hashedPassword = await bcrypt.hash(manager.password, 10);
        manager.password = hashedPassword;

        await this.userRepository.create(manager);
        console.log('manager seeded successfully.');
      } else {
        console.log('manager already exists. Seeder skipped.');
      }
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = ManagerSeeder;