import { Module } from "@nestjs/common";
import { MachineService } from "./machine.service";
import { MachineController } from "./machine.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Machine } from "./model/machine.model";
import { Company } from "../company/models/company.models";
import { MachineDriver } from "../machine_driver/model/machine_driver.model";

@Module({
  imports: [SequelizeModule.forFeature([Machine, Company, MachineDriver])],
  controllers: [MachineController],
  providers: [MachineService],
})
export class MachineModule {}
