import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Role } from "../../role/model/role.model";
import { UserRole } from "./user-role.model copy";
import { ApiProperty } from "@nestjs/swagger";

interface IUserCreationAttr {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {

  @ApiProperty({
    example: 1,
    description: 'Foydalanuvchi id'
  })
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

  @ApiProperty({
    example: 'user1@mail.uz',
    description: 'Foydalanuvchi email'
  })
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

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
