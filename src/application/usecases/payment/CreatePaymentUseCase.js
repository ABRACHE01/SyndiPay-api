const PaymentServices = require("../../../adapters/services/payment/PaymentServices");
class CreatePaymentUseCase {
  constructor() {
    this.paymentServices = new PaymentServices();
  }

  execute = async (data) => {
    try {
      await this.paymentServices.validateCreatePayment(data);
  
      const createdPayment = await this.paymentServices.createPayment(data);
  
      return {
        status: 200,
        message: "Payment created successfully",
        payment: createdPayment,
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

module.exports = CreatePaymentUseCase;