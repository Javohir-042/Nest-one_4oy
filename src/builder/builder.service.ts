import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateBuilderDto } from "./dto/create-builder.dto";
import { UpdateBuilderDto } from "./dto/update-builder.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Builder } from "./model/builder.model";
import { Company } from "../company/models/company.models";

// import { CompanyService } from '../company/company.service';

@Injectable()
export class BuilderService {
  constructor(
    @InjectModel(Builder) private readonly builderModel: typeof Builder,
    @InjectModel(Company) private readonly companyModel: typeof Company,

    // private readonly companyService: CompanyService
  ) {}

  async create(createBuilderDto: CreateBuilderDto): Promise<Builder> {
    const { full_name, birth_day, salary, companyId } = createBuilderDto;
    if (!full_name || !birth_day || !salary || !companyId) {
      throw new NotFoundException("Iltimos barchasini kiriting");
    }

    const existsFullname = await this.builderModel.findOne({
      where: { full_name },
    });
    if (existsFullname) {
      throw new BadRequestException("Bunday full_name mavjud");
    }

    const company = await this.companyModel.findByPk(companyId);
    if (!company) {
      throw new NotFoundException("bunday companiya mavjud emas");
    }

    return this.builderModel.create(createBuilderDto);
  }

  findAll(): Promise<Builder[]> {
    return this.builderModel.findAll({
      include: { all: true },
      order: [["id", "ASC"]],
    });
  }

  async findOne(id: number): Promise<Builder | null> {
    const builder = await this.builderModel.findByPk(id, {
      include: { all: true },
    });
    if (!builder) {
      throw new NotFoundException("Builder not found");
    }

    return builder;
  }

  async update(id: number, updateBuilderDto: UpdateBuilderDto) {
    const builderId = await this.builderModel.findByPk(id);
    if (!builderId) {
      throw new BadRequestException("Builder not found");
    }

    const { full_name, companyId } = updateBuilderDto;

    if (full_name) {
      const existsFullname = await this.builderModel.findOne({
        where: { full_name },
      });
      if (existsFullname) {
        throw new BadRequestException(
          "Bunday Fullname mavjud boshqa fullname kiriting",
        );
      }
    }

    const company_id = await this.companyModel.findByPk(companyId);
    if (!company_id) {
      throw new NotFoundException(" Bunday company_id mavjud emas");
    }

    const builder = await this.builderModel.update(updateBuilderDto, {
      where: { id },
      returning: true,
    });
    return builder[1][0];
  }

  async remove(id: number) {
    const delCount = await this.builderModel.destroy({ where: { id } });
    if (!delCount) {
      return { message: "Bunday kompaniya mavjud emas" };
    }
    return { message: "Kompaniya o'chirildi", id };
  }
}
