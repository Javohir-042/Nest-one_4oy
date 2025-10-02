import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AddRemoveDto } from "./dto/add-remove-role.dto";
import { ActivateUserDto } from "./dto/activate-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./model/user.model";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { SelfGuard } from "../common/guards/self.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/role.guard";

@ApiTags("User - Foydalanuvchi")
@Roles("SUPERADMIN")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: "Foydalanuvchi qo'shish"
  })
  @ApiResponse({
    status: 201,
    description: "Yangi qo'shilgan foydalanuvchi",
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post("add-role")
  @HttpCode(201)
  addRole(@Body() addRemoveDto: AddRemoveDto) {
    return this.usersService.addRole(addRemoveDto);
  }


  @Post("remove-role")
  @HttpCode(HttpStatus.ACCEPTED)
  removeRole(@Body() addRemoveDto: AddRemoveDto) {
    return this.usersService.removeRole(addRemoveDto);
  }


  @Post("activate")
  @HttpCode(HttpStatus.OK)
  activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.usersService.activateUser(activateUserDto);
  }

  @ApiOperation({
    summary: "Foydalanuvchi ro'yxatini chiqarish"
  })
  @ApiResponse({
    status: 200,
    description: "foydalanuvchilar ro'yxati",
    type: [User],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(SelfGuard)
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Get("email/:email")
  findUserByEmail(@Param("email") email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
