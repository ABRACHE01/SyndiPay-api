const ClientServices = require("../../../adapters/services/client/ClientServices");

class UpdateClientUseCase {
  constructor() {
    this.clientServices = new ClientServices();
  }

  execute = async (clientId, data) => {
    try {
      await this.clientServices.validateUpdateClient(data);
      const updatedClient = await this.clientServices.updateClient(clientId, data);

      return {
        status: 200,
        message: "Client updated successfully",
        client: updatedClient,
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

module.exports = UpdateClientUseCase;