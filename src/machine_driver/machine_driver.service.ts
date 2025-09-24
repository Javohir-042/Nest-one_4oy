import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMachineDriverDto } from './dto/create-machine_driver.dto';
import { UpdateMachineDriverDto } from './dto/update-machine_driver.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MachineDriver } from './model/machine_driver.model';

@Injectable()
export class MachineDriverService {
  constructor(
    @InjectModel(MachineDriver) private readonly machineDriverModel: typeof MachineDriver
  ) { }

  async create(createMachineDriverDto: CreateMachineDriverDto): Promise<MachineDriver> {
    const { machineId, driverId } = createMachineDriverDto;

    if (!machineId || !driverId) {
      throw new NotFoundException("Barchasini kiriting")
    }

    return this.machineDriverModel.create(createMachineDriverDto)
  }

  findAll(): Promise<MachineDriver[]> {
    return this.machineDriverModel.findAll({ include: { all: true } })
  }

  async findOne(id: number): Promise<MachineDriver | null> {
    const machineDriver = await this.machineDriverModel.findByPk(id, { include: { all: true } })
    if (!machineDriver) {
      throw new NotFoundException("MachineDriver not found")
    }

    return machineDriver;
  }

  async update(id: number, updateMachineDriverDto: UpdateMachineDriverDto) {
    const machineDriver = await this.machineDriverModel.findByPk(id)
    if (!machineDriver) {
      throw new NotFoundException("MachineDriver not found")
    }

    const machine_driver = await this.machineDriverModel.update(updateMachineDriverDto, { where: { id }, returning: true })
    return machine_driver[1][0]
  }

  async remove(id: number) {
    const machineDriver = await this.machineDriverModel.destroy({ where: { id } });
    if (!machineDriver) {
      return { message: "Bunday MachinaDriver mavjud emas"}
    }
    return { message: "MachinaDriver o'chirildi", id}
  }
}
