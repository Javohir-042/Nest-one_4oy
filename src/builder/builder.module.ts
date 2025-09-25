import { forwardRef, Module } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { BuilderController } from './builder.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Builder } from './model/builder.model';
import { Company } from '../company/models/company.models';

// import { CompanyModule } from '../company/company.module';

@Module({
  imports: [SequelizeModule.forFeature([Builder, Company]), 

  // forwardRef(() => CompanyModule),
  ],
  
  controllers: [BuilderController],
  providers: [BuilderService],

  // exports: [BuilderService],
})
export class BuilderModule { }
