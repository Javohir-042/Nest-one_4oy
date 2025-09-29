import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/model/user.model";
import { UserRole } from "../../users/model/user-role.model copy";

interface IRoleCreationAttr {
  value: string;
  description: string;
}

@Table({ tableName: "role" })
export class Role extends Model<Role, IRoleCreationAttr> {
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
  declare value: string;

  @Column({
    type: DataType.STRING,
  })
  declare description?: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
