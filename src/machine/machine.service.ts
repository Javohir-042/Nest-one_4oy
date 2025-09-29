import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateMachineDto } from "./dto/create-machine.dto";
import { UpdateMachineDto } from "./dto/update-machine.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Machine } from "./model/machine.model";
import { Company } from "../company/models/company.models";

@Injectable()
export class MachineService {
  constructor(
    @InjectModel(Machine) private readonly machineModel: typeof Machine,
    @InjectModel(Company) private readonly companyModel: typeof Company,
  ) {}

  async create(createMachineDto: CreateMachineDto): Promise<Machine> {
    const { model, name, companyId } = createMachineDto;
    if (!model || !name || !companyId) {
      throw new NotFoundException("Iltimos barchasini kiriting");
    }

    const companyModel = await this.companyModel.findByPk(companyId);
    if (!companyModel) {
      throw new NotFoundException("Bunday companiya mavjud emas");
    }

    return this.machineModel.create(createMachineDto);
  }

  findAll(): Promise<Machine[]> {
    return this.machineModel.findAll({
      include: { all: true },
      order: [["id", "ASC"]],
    });
  }

  async findOne(id: number): Promise<Machine | null> {
    const machineId = await this.machineModel.findByPk(id, {
      include: { all: true },
    });
    if (!machineId) {
      throw new NotFoundException("Machine not found");
    }

    return machineId;
  }

  async update(id: number, updateMachineDto: UpdateMachineDto) {
    const { model, name } = updateMachineDto;

    const machineId = await this.machineModel.findByPk(id);
    if (!machineId) {
      throw new BadRequestException("Machina not found");
    }

    const machine = await this.machineModel.update(updateMachineDto, {
      where: { id },
      returning: true,
    });
    return machine[1][0];
  }

  async remove(id: number) {
    const deleted = await this.machineModel.destroy({ where: { id } });
    if (!deleted) {
      return { message: "Bunday machina mavjud emas" };
    }
    return { message: "Machina O'chirildi " };
  }
}
