import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateDriverDto } from "./dto/create-driver.dto";
import { UpdateDriverDto } from "./dto/update-driver.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Driver } from "./models/driver.models";
import { FileService } from "../file/file.service";

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver) private readonly drverModel: typeof Driver,
    private readonly fileService: FileService
  ) { }

  async create(createDriverDto: CreateDriverDto, image: any): Promise<Driver> {
    const { first_name, last_name, phone, driver_license } = createDriverDto;

    const fileName = await this.fileService.saveFile(image)

    if (!first_name || !last_name || !phone || !driver_license) {
      throw new NotFoundException("Iltimos barchasini kiriting");
    }

    const existsPhone = await this.drverModel.findOne({ where: { phone } });
    if (existsPhone) {
      throw new BadRequestException("Bunday Telefor raqam bor ");
    }

    const existsDriver_license = await this.drverModel.findOne({
      where: { driver_license },
    });
    if (existsDriver_license) {
      throw new BadRequestException("Bunday Haydovchi litsenziya bor");
    }

    return this.drverModel.create({ ...createDriverDto, image: fileName });
  }

  findAll(): Promise<Driver[]> {
    return this.drverModel.findAll({
      include: { all: true },
      order: [["id", "ASC"]],
    });
  }

  async findOne(id: number): Promise<Driver | null> {
    const driver = await this.drverModel.findByPk(id, {
      include: { all: true },
    });
    if (!driver) {
      throw new NotFoundException("driver not found");
    }

    return driver;
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    const { phone, driver_license } = updateDriverDto;

    const driverId = await this.drverModel.findByPk(id);
    if (!driverId) {
      throw new NotFoundException("Driver not found");
    }

    if (phone) {
      const existsPhone = await this.drverModel.findOne({ where: { phone } });
      if (existsPhone && existsPhone.id !== +id) {
        throw new BadRequestException("Bunday Phone number mavjud");
      }
    }

    if (driver_license) {
      const existsDriver_license = await this.drverModel.findOne({
        where: { driver_license },
      });
      if (existsDriver_license && existsDriver_license.id !== +id) {
        throw new BadRequestException("Bunday Driver_license mavjud");
      }
    }

    const company = await this.drverModel.update(updateDriverDto, {
      where: { id },
      returning: true,
    });
    return company[1][0];
  }

  async remove(id: number) {
    const delCount = await this.drverModel.destroy({ where: { id } });
    if (!delCount) {
      return { message: "Bunday kompaniya mavjud emas" };
    }
    return { message: "Kompaniya o'chirildi", id };
  }
}
