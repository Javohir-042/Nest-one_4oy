import { forwardRef, Module } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { BuilderController } from './builder.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Builder } from './model/builder.model';
import { Company } from '../company/models/company.models';

@Module({
  imports: [SequelizeModule.forFeature([Builder, Company])],
  
  controllers: [BuilderController],
  providers: [BuilderService],
})
export class BuilderModule { }
