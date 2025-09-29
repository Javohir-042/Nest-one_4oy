import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Machine } from "../../machine/model/machine.model";
import { Driver } from "../../driver/models/driver.models";

interface IMachine_driverCreation {
  machineId: number;
  driverId: number;
}

@Table({ tableName: "machine_driver" })
export class MachineDriver extends Model<
  MachineDriver,
  IMachine_driverCreation
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Machine)
  @Column({
    type: DataType.INTEGER,
    onDelete: "CASCADE",
  })
  declare machineId: number;

  @BelongsTo(() => Machine)
  machine: Machine;

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
    onDelete: "CASCADE",
  })
  declare driverId: number;

  @BelongsTo(() => Driver)
  driver: Driver;
}
