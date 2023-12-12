const ClientServices = require("../../../adapters/services/client/ClientServices");

class DeleteClientUseCase {
  constructor() {
    this.clientServices = new ClientServices();
  }

  execute = async (clientId) => {
    try {
      await this.clientServices.deleteClient(clientId);

      return {
        status: 200,
        message: "Client deleted successfully",
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

module.exports = DeleteClientUseCase;