const ClientServices = require("../../../adapters/services/client/ClientServices");

class GetAllClientsUseCase {
  constructor() {
    this.clientServices = new ClientServices();
  }

  execute = async () => {
    try {
      const clients = await this.clientServices.getAllClients();

      return {
        status: 200,
        message: "Clients retrieved successfully",
        clients: clients,
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

module.exports = GetAllClientsUseCase;