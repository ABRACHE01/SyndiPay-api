const ClientServices = require("../../../adapters/services/client/ClientServices");

class GetClientByIdUseCase {
  constructor() {
    this.clientServices = new ClientServices();
  }

  execute = async (clientId) => {
    try {
      const client = await this.clientServices.getClientById(clientId);

      return {
        status: 200,
        message: "Client retrieved successfully",
        client: client,
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

module.exports = GetClientByIdUseCase;