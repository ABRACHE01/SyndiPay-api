const PaymentServices = require("../../../adapters/services/payment/PaymentServices");


class DeletePaymentUseCase {
  constructor() {
    this.paymentServices = new PaymentServices();
  }

  execute = async (paymentId) => {
    try {
      await this.paymentServices.deletePayment(paymentId);
  
      return {
        status: 200,
        message: "Payment deleted successfully",
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


module.exports = DeletePaymentUseCase;