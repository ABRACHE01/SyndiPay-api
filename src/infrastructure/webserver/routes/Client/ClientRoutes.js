const express = require("express");
const clientRoutes = express.Router();
const ClientController = require("../../../../adapters/controllers/clients/ClientController");
const clientController = new ClientController();

clientRoutes.post("/", clientController.createClient );

clientRoutes.get("/", clientController.getAllClients);

clientRoutes.get("/:clientId", clientController.getClientById );

clientRoutes.put("/:clientId", clientController.updateClient);

clientRoutes.delete("/:clientId", clientController.deleteClient);


module.exports = clientRoutes;