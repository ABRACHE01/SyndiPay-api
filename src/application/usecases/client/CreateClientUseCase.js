const ClientServices = require("../../../adapters/services/client/ClientServices");

class CreateClientUseCase {
  constructor() {
    this.clientServices = new ClientServices();
  }

  execute = async (data) => {
    try {
      await this.clientServices.validateCreateClient(data);

      const createdClient = await this.clientServices.createClient(data);

      return {
        status: 200,
        message: "Client created successfully",
        client: createdClient,
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

module.exports = CreateClientUseCase;