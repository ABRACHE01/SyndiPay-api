const CreatePaymentUseCase = require("../../../application/usecases/payment/CreatePaymentUseCase");
const GetPaymentByIdUseCase = require("../../../application/usecases/payment/GetPaymentByIdUseCase");
const UpdatePaymentUseCase = require("../../../application/usecases/payment/UpdatePaymentUseCase");
const DeletePaymentUseCase = require("../../../application/usecases/payment/DeletePaymentUseCase");
const GetAllPaymentsUseCase = require("../../../application/usecases/payment/GetAllPaymentsUseCase");

class PaymentController {
  constructor() {
    this.createPaymentUseCase = new CreatePaymentUseCase();
    this.getPaymentByIdUseCase = new GetPaymentByIdUseCase();
    this.updatePaymentUseCase = new UpdatePaymentUseCase();
    this.deletePaymentUseCase = new DeletePaymentUseCase();
    this.getAllPaymentsUseCase = new GetAllPaymentsUseCase();
  }

  createPayment = async (req, res) => {
    const inputData = req.body;
    const data = { ...inputData };
    const { status, message, payment } =
      await this.createPaymentUseCase.execute(data);

    res.status(status).json({ message, payment });
  };

  getPaymentById = async (req, res) => {
    const { paymentId } = req.params;

    const { status, message, payment } =
      await this.getPaymentByIdUseCase.execute(paymentId);

    res.status(status).json({ message, payment });
  };

  updatePayment = async (req, res) => {
    const { paymentId } = req.params;
    const data = req.body;
    const { status, message, payment } =
      await this.updatePaymentUseCase.execute(paymentId, data);

    res.status(status).json({ message, payment });
  };

  deletePayment = async (req, res) => {
    const { paymentId } = req.params;
    const { status, message } = await this.deletePaymentUseCase.execute(
      paymentId
    );

    res.status(status).json({ message });
  };

  getAllPayments = async (req, res) => {
    const { status, message, payments } =
      await this.getAllPaymentsUseCase.execute();
    res.status(status).json({ message, payments });
  };
}

module.exports = PaymentController;
