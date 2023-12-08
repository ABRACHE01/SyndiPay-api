const PaymentServices = require("../../../adapters/services/payment/PaymentServices");



class GetPaymentByIdUseCase {
    constructor() {
      this.paymentServices = new PaymentServices();
    }
  
    execute = async (paymentId) => {
        try {
          const payment = await this.paymentServices.getPaymentById(paymentId);
      
          return {
            status: 200,
            message: "Payment retrieved successfully",
            payment: payment,
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

module.exports = GetPaymentByIdUseCase;