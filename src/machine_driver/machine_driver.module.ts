import { Module } from '@nestjs/common';
import { MachineDriverService } from './machine_driver.service';
import { MachineDriverController } from './machine_driver.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MachineDriver } from './model/machine_driver.model';
import { Machine } from '../machine/model/machine.model';
import { Driver } from '../driver/models/driver.models';

@Module({
  imports: [SequelizeModule.forFeature([MachineDriver,Machine, Driver])],
  controllers: [MachineDriverController],
  providers: [MachineDriverService],
})
export class MachineDriverModule {}
