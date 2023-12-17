const PaymentRepository = require("../../../infrastructure/repositories/PaymentRepository");
const validateData = require("../../../infrastructure/helpers/validateData");


class PaymentServices {
    constructor() {
      this.paymentRepository = new PaymentRepository();
      this.validateData = validateData;
    }
  

      createPayment = async (data) => {
        const payment = await this.paymentRepository.create(data);
      
        if (!payment) {
          const error = new Error("Payment could not be created");
          error.status = 500;
      
          throw error;
        }
      
        return payment;
      };
      
      getPaymentById = async (paymentId) => {
        const payment = await this.paymentRepository.findById(paymentId);
      
        if (!payment) {
          const error = new Error("Payment not found");
          error.status = 404;
      
          throw error;
        }
      
        return payment;
      };
      
      updatePayment = async (paymentId, data) => {
        const payment = await this.paymentRepository.findById(paymentId);
      
        if (!payment) {
          const error = new Error("Payment not found");
          error.status = 404;
      
          throw error;
        }
      
        const updatedPayment = await this.paymentRepository.update(paymentId, data);
      
        return updatedPayment;
      };
      
      deletePayment = async (paymentId) => {
        const payment = await this.paymentRepository.findById(paymentId);
      
        if (!payment) {
          const error = new Error("Payment not found");
          error.status = 404;
      
          throw error;
        }
      
        await this.paymentRepository.softDelete(paymentId);
      };
      
      getAllPayments = async () => {
        const payments = await this.paymentRepository.findAll();
      
        return payments;
      };

      getPaymentsByApartmentId = async (apartmentId) => {
        const payments = await this.paymentRepository.findByApartmentId(apartmentId);
    
        return payments;
      };
          
      validateCreatePayment = async (data) => {
        const { error: validationError } = this.validateData(data, "addPayment");
      
        if (validationError) {
          const error = new Error(validationError.message);
          error.status = validationError.status;
      
          throw error;
        }
      };
      
      validateUpdatePayment = async (data) => {
        const { error: validationError } = this.validateData(data, "updatePayment");
      
        if (validationError) {
          const error = new Error(validationError.message);
          error.status = validationError.status;
      
          throw error;
        }
      };

}

module.exports = PaymentServices;