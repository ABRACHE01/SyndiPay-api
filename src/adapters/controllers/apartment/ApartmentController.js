const CreateApartmentUseCase = require("../../../application/usecases/apartment/CreateApartmentUseCase");
const GetApartmentByIdUseCase = require("../../../application/usecases/apartment/GetApartmentByIdUseCase");
const UpdateApartmentUseCase = require("../../../application/usecases/apartment/UpdateApartmentUseCase");
const DeleteApartmentUseCase = require("../../../application/usecases/apartment/DeleteApartmentUseCase");
const GetAllApartmentsUseCase = require("../../../application/usecases/apartment/GetAllApartmentsUseCase");

class MenuController {
  constructor() {
    this.createApartmentUseCase = new CreateApartmentUseCase();
    this.getApartmentByIdUseCase = new GetApartmentByIdUseCase();
    this.updateApartmentUseCase = new UpdateApartmentUseCase();
    this.deleteApartmentUseCase = new DeleteApartmentUseCase();
    this.getAllApartmentsUseCase = new GetAllApartmentsUseCase();
  }

  createApartment = async (req, res) => {
    const  inputData  = req.body;
    const data = {...inputData } 
    const { status, message, menu } = await this.createApartmentUseCase.execute(data);

    res.status(status).json({ message, menu });
  };

  getApartmentById = async (req, res) => {
    const { apartmentId } = req.params;

    const { status, message, apartment } = await this.getApartmentByIdUseCase.execute(apartmentId);

    res.status(status).json({ message, apartment });
  };

  updateApartment = async (req, res) => {
    const { apartmentId } = req.params;
    const  data  = req.body;
    const { status, message, apartment } = await this.updateApartmentUseCase.execute(apartmentId, data);

    res.status(status).json({ message, apartment });
  };

  deleteApartment = async (req, res) => {
    const { apartmentId } = req.params;
    const { status, message } = await this.deleteApartmentUseCase.execute(apartmentId);

    res.status(status).json({ message });
  };

  getAllApartments = async (req, res) => {
    const { status, message, apartments } = await this.getAllApartmentsUseCase.execute();
    res.status(status).json({ message, apartments });
  };
}

module.exports = MenuController;