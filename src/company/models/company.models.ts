import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Builder } from "../../builder/model/builder.model";
import { Machine } from "../../machine/model/machine.model";
interface ICompanyCreationAttr {
  name: string;
  address: string;
  email: string;
  phone: string;
}

@Table({ tableName: "company" })
export class Company extends Model<Company, ICompanyCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    unique: true,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(50),
    unique: true,
  })
  declare address: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(15),
    unique: true,
  })
  declare phone: string;

  @HasMany(() => Builder)
  builders: Builder[];

  @HasMany(() => Machine)
  machines: Machine[];
}
