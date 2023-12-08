const PaymentServices = require("../../../adapters/services/payment/PaymentServices");



class UpdatePaymentUseCase {
    constructor() {
      this.paymentServices = new PaymentServices();
    }
  
    execute = async (paymentId, data) => {
        try {
          await this.paymentServices.validateUpdatePayment(data);
          const updatedPayment = await this.paymentServices.updatePayment(paymentId, data);
      
          return {
            status: 200,
            message: "Payment updated successfully",
            payment: updatedPayment,
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

    module.exports = UpdatePaymentUseCase;