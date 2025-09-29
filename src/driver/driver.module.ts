import { Module } from "@nestjs/common";
import { DriverService } from "./driver.service";
import { DriverController } from "./driver.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Driver } from "./models/driver.models";
import { MachineDriver } from "../machine_driver/model/machine_driver.model";

@Module({
  imports: [SequelizeModule.forFeature([Driver, MachineDriver])],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
