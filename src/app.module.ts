import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CompanyModule } from './company/company.module';
import { Company } from "./company/models/company.models";
import { DriverModule } from './driver/driver.module';
import { BuilderModule } from './builder/builder.module';
import { Builder } from "./builder/model/builder.model";
import { MachineModule } from './machine/machine.module';
import { Machine } from "./machine/model/machine.model";
import { MachineDriverModule } from './machine_driver/machine_driver.module';
import { Driver } from "./driver/models/driver.models";
import { MachineDriver } from "./machine_driver/model/machine_driver.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [Company, Builder, Machine, Driver, MachineDriver],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
      synchronize: true,

    }),
    CompanyModule,
    DriverModule,
    BuilderModule,
    MachineModule,
    MachineDriverModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
