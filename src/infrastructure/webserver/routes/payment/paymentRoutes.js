const express = require("express");
const paymentRoutes = express.Router();
const PaymentController = require("../../../../adapters/controllers/payment/PaymentController");
const paymentController = new PaymentController();

paymentRoutes.post("/", paymentController.createPayment);

paymentRoutes.get("/", paymentController.getAllPayments);

paymentRoutes.get("/:paymentId", paymentController.getPaymentById);

paymentRoutes.get("/apartment/:apartmentId", paymentController.getPaymentsByApartmentId); 

paymentRoutes.put("/:paymentId", paymentController.updatePayment);

paymentRoutes.delete("/:paymentId", paymentController.deletePayment);

module.exports = paymentRoutes;
