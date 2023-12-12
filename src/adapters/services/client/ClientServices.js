const ClientRepository = require("../../../infrastructure/repositories/ClientRepository");
const validateData = require("../../../infrastructure/helpers/validateData");

class ClientServices {
  constructor() {
    this.clientRepository = new ClientRepository();
    this.validateData = validateData;
  }
  
  createClient = async (data) => {
    const client = await this.clientRepository.create(data);

    if (!client) {
      const error = new Error("Client could not be created");
      error.status = 500;

      throw error;
    }

    return client;
  };

  getClientById = async (clientId) => {
    const client = await this.clientRepository.findById(clientId);

    if (!client) {
      const error = new Error("Client not found");
      error.status = 404;

      throw error;
    }

    return client;
  };

  updateClient = async (clientId, data) => {
    const client = await this.clientRepository.findById(clientId);

    if (!client) {
      const error = new Error("Client not found");
      error.status = 404;

      throw error;
    }

    const updatedClient = await this.clientRepository.update(clientId, data);

    return updatedClient;
  };

  deleteClient = async (clientId) => {
    const client = await this.clientRepository.findById(clientId);
    if (!client) {
      const error = new Error("Client not found");
      error.status = 404;

      throw error;
    }

    await this.clientRepository.softDelete(clientId);
  };
  
  getAllClients = async () => {
    const clients = await this.clientRepository.findAll();

    return clients;
  };
  
  validateCreateClient = async (data) => {
    const { error: validationError } = this.validateData(
      data,
      "addClient"
    );

    if (validationError) {
      const error = new Error(validationError.message);
      error.status = validationError.status;

      throw error;
    }
  }
  
  validateUpdateClient = async (data) => {
    const { error: validationError } = this.validateData(
      data,
      "updateClient"
    );

    if (validationError) {
      const error = new Error(validationError.message);
      error.status = validationError.status;

      throw error;
    }
  }

}

module.exports = ClientServices;