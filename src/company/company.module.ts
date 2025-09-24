import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './models/company.models';
import { Builder } from '../builder/model/builder.model';
import { Machine } from '../machine/model/machine.model';

@Module({
  imports: [SequelizeModule.forFeature([Company, Builder, Machine])],
  controllers: [CompanyController],
  providers: [CompanyService],

})
export class CompanyModule { }
