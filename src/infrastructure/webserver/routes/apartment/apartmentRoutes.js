const express = require("express");
const apartmentRoutes = express.Router();
const ApartmentController = require("../../../../adapters/controllers/apartment/ApartmentController");
const apartmentController = new ApartmentController();

apartmentRoutes.post("/", apartmentController.createApartment);

apartmentRoutes.get("/", apartmentController.getAllApartments);

apartmentRoutes.get("/:apartmentId", apartmentController.getApartmentById);

apartmentRoutes.put("/:apartmentId", apartmentController.updateApartment);

apartmentRoutes.delete("/:apartmentId", apartmentController.deleteApartment);

module.exports = apartmentRoutes;
