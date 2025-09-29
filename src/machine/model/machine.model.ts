import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Company } from "../../company/models/company.models";
import { MachineDriver } from "../../machine_driver/model/machine_driver.model";
import { Driver } from "../../driver/models/driver.models";

interface IMachineCreationAttr {
  model: string;
  name: string;
  companyId: number;
}

@Table({ tableName: "machine" })
export class Machine extends Model<Machine, IMachineCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare model: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare name: string;

  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    onDelete: "CASCADE",
  })
  declare companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  // @HasMany(() => MachineDriver)
  // machineDriver: MachineDriver[];

  @BelongsToMany(() => Driver, () => MachineDriver)
  drivers: Driver[];
}
