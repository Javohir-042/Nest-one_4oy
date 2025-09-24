import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { UpdateBuilderDto } from './dto/update-builder.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Builder } from './model/builder.model';

@Injectable()
export class BuilderService {
  constructor(
    @InjectModel(Builder) private readonly builderModel: typeof Builder
  ) { }

  async create(createBuilderDto: CreateBuilderDto): Promise<Builder> {
    const { full_name, birth_day, salary, companyId } = createBuilderDto
    if (!full_name || !birth_day || !salary || !companyId) {
      throw new NotFoundException("Iltimos barchasini kiriting")
    }

    return this.builderModel.create(createBuilderDto)
  }

  findAll(): Promise<Builder[]> {
    return this.builderModel.findAll({ include: { all: true }});
  }

  async findOne(id: number): Promise<Builder | null> {
    const builder = await this.builderModel.findByPk(id);
    if (!builder) {
      throw new NotFoundException("Builder not found")
    }

    return builder;
  }

  async update(id: number, updateBuilderDto: UpdateBuilderDto) {

    const builderId = await this.builderModel.findByPk(id)
    if (!builderId) {
      throw new BadRequestException("Builder not found")
    }

    const builder = await this.builderModel.update(updateBuilderDto, { where: { id }, returning: true })
    return builder[1][0]
  }

  async remove(id: number) {
    const delCount = await this.builderModel.destroy({ where: { id } });
    if (!delCount) {
      return { message: "Bunday kompaniya mavjud emas" }
    }
    return { message: "Kompaniya o'chirildi", id };
  }
}
