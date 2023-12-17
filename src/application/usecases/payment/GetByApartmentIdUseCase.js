const PaymentServices = require("../../../adapters/services/payment/PaymentServices");

class GetByApartmentIdUseCase {
  constructor() {
    this.paymentServices = new PaymentServices();
  }

  execute = async (apartmentId) => {
    try {
      const payments = await this.paymentServices.getPaymentsByApartmentId(apartmentId);

      return {
        status: 200,
        message: "Payments retrieved successfully",
        payments: payments,
      };
    } catch (error) {
      console.log(error);
      return {
        status: error.status || 500,
        message: error.message || "Something went wrong, please try again",
      };
    }
  };
}

module.exports = GetByApartmentIdUseCase;