import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./model/user.model";
import { UserRole } from "./model/user-role.model copy";
import { Role } from "../role/model/role.model";
import { RoleModule } from "../role/role.module";

@Module({
  imports: [SequelizeModule.forFeature([User, UserRole, Role]), RoleModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
