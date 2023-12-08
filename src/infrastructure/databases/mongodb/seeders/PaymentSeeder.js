const PaymentRepository = require("../../../repositories/PaymentRepository");
const ApartmentRepository = require("../../../repositories/ApartmentRepository");


class PaymentSeeder {
  constructor() {
    this.paymentRepository = new PaymentRepository();
    this.apartmentRepository = new ApartmentRepository();
  }

  seed = async () => {
    try {
      const existingPayments = await this.paymentRepository.find();
  
      if (existingPayments.length === 0) {
        const apartments = await this.apartmentRepository.find();
        const payments = [
          {
            apartment: apartments[0]._id,
            amount: 1000,
            paymentDate: new Date(),
            paymentMethod: "Credit Card",
            isPaid: true,
            receiptNumber: "12345678",
            notes: "Paid on time",
          },
          {
            apartment: apartments[1]._id,
            amount: 1500,
            paymentDate: new Date(),
            paymentMethod: "Cash",
            isPaid: false,
            receiptNumber: null,
            notes: "Pending payment",
          },
        ];
  
        await this.paymentRepository.createMany(payments);
        console.log("Payments seeded successfully.");
      } else {
        console.log("Payments already exist. Seeder skipped.");
      }
    } catch (error) {
      throw new Error(error);
    }
  };


}

module.exports = PaymentSeeder;