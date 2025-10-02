import { Module } from "@nestjs/common";
import { DriverService } from "./driver.service";
import { DriverController } from "./driver.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Driver } from "./models/driver.models";
import { MachineDriver } from "../machine_driver/model/machine_driver.model";
import { FileModule } from "../file/file.module";

@Module({
  imports: [SequelizeModule.forFeature([Driver, MachineDriver]), FileModule],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
