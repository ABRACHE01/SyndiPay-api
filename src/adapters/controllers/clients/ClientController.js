const CreateClientUseCase = require("../../../application/usecases/client/CreateClientUseCase");
const GetClientByIdUseCase = require("../../../application/usecases/client/GetClientByIdUseCase");
const UpdateClientUseCase = require("../../../application/usecases/client/UpdateClientUseCase");
const DeleteClientUseCase = require("../../../application/usecases/client/DeleteClientUseCase");
const GetAllClientsUseCase = require("../../../application/usecases/client/GetAllClientsUseCase");

class ClientController {
  constructor() {
    this.createClientUseCase = new CreateClientUseCase();
    this.getClientByIdUseCase = new GetClientByIdUseCase();
    this.updateClientUseCase = new UpdateClientUseCase();
    this.deleteClientUseCase = new DeleteClientUseCase();
    this.getAllClientsUseCase = new GetAllClientsUseCase();
  }

  createClient = async (req, res) => {
    const inputData = req.body;
    const data = { ...inputData };
    const { status, message, client } = await this.createClientUseCase.execute(data);

    res.status(status).json({ message, client });
  };

  getClientById = async (req, res) => {
    const { clientId } = req.params;

    const { status, message, client } = await this.getClientByIdUseCase.execute(clientId);

    res.status(status).json({ message, client });
  };

  updateClient = async (req, res) => {
    const { clientId } = req.params;
    const data = req.body;
    const { status, message, client } = await this.updateClientUseCase.execute(clientId, data);

    res.status(status).json({ message, client });
  };

  deleteClient = async (req, res) => {
    const { clientId } = req.params;
    const { status, message } = await this.deleteClientUseCase.execute(clientId);

    res.status(status).json({ message });
  };

  getAllClients = async (req, res) => {
    const { status, message, clients } = await this.getAllClientsUseCase.execute();
    res.status(status).json({ message, clients });
  };
}

module.exports = ClientController;