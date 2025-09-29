import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Company } from "./models/company.models";

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company) private readonly companyModel: typeof Company,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const { name, email, address, phone } = createCompanyDto;
    if (!name || !email || !address || !phone) {
      throw new NotFoundException("Iltimos barchasini kiriting");
    }

    const existsName = await this.companyModel.findOne({ where: { name } });
    if (existsName) {
      throw new BadRequestException("Bunday nomli companiya mavjud");
    }

    const existsEmail = await this.companyModel.findOne({ where: { email } });
    if (existsEmail) {
      throw new BadRequestException("Bunday email mavjud");
    }

    const existsAddress = await this.companyModel.findOne({
      where: { address },
    });
    if (existsAddress) {
      throw new BadRequestException("Bunday address mavjud");
    }

    const existsPhone = await this.companyModel.findOne({ where: { phone } });
    if (existsPhone) {
      throw new BadRequestException("Bunday phone mavjud");
    }

    return this.companyModel.create(createCompanyDto);
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.findAll({
      include: { all: true },
      order: [["id", "ASC"]],
    });
  }

  async findOne(id: number): Promise<Company | null> {
    const companiya = await this.companyModel.findByPk(id, {
      include: { all: true },
    });
    if (!companiya) {
      throw new NotFoundException("Companiy not found");
    }

    return companiya;
  }

  async findOneByName(name: string): Promise<Company | null> {
    const companiyaName = await this.companyModel.findOne({ where: { name } });
    if (!companiyaName) {
      throw new NotFoundException("CompaniyaName not found");
    }
    return companiyaName;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const { name, address, email, phone } = updateCompanyDto;

    const companiyaID = await this.companyModel.findByPk(id);
    if (!companiyaID) {
      throw new NotFoundException("Companiya not found");
    }

    if (name) {
      const existsName = await this.companyModel.findOne({ where: { name } });
      if (existsName && existsName.id !== id) {
        throw new BadRequestException("Bu name band ");
      }
    }

    if (address) {
      const existsAddress = await this.companyModel.findOne({
        where: { address },
      });
      if (existsAddress && existsAddress.id !== id) {
        throw new BadRequestException(
          "Bunday Addres mavjud boshqa adres toping",
        );
      }
    }

    if (email) {
      const existsEmail = await this.companyModel.findOne({ where: { email } });
      if (existsEmail && existsEmail.id !== id) {
        throw new BadRequestException("Bunday Email mavjud");
      }
    }

    if (phone) {
      const existsPhone = await this.companyModel.findOne({ where: { phone } });
      if (existsPhone && existsPhone.id !== id) {
        throw new BadRequestException("Bunday Phone number mavjud");
      }
    }

    const company = await this.companyModel.update(updateCompanyDto, {
      where: { id },
      returning: true,
    });
    return company[1][0];
  }

  async remove(id: number) {
    const delCount = await this.companyModel.destroy({ where: { id } });
    if (!delCount) {
      return { message: "Bunday kompaniya mavjud emas" };
    }
    return { message: "Kompaniya o'chirildi", id };
  }
}
