import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Role } from "../../role/model/role.model";
import { UserRole } from "./user-role.model copy";

interface IUserCreationAttr {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    unique: true,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(1000),
  })
  declare password: string;


  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
