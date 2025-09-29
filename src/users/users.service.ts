import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./model/user.model";
import { RoleService } from "../role/role.service";
import { Role } from "../role/model/role.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly roleService: RoleService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;

    if (!name || !email || !password) {
      throw new NotFoundException('Iltimos barchasini kiriting')
    }

    const existsName = await this.userModel.findOne({ where: { name } })
    if (existsName) {
      throw new BadRequestException('Bunday name mavjud')
    }

    const existsEmail = await this.userModel.findOne({ where: { email } })
    if (existsEmail) {
      throw new BadRequestException('Bunday email mavjud')
    }

    const existsPassword = await this.userModel.findOne({ where: { password } })
    if (existsPassword) {
      throw new BadRequestException('Bunday password mavjud')
    }

    const role = await this.roleService.findRoleByValue(createUserDto.value);
    if (!role) {
      throw new NotFoundException("Bunday role mavjud emas");
    }

    const newUser = await this.userModel.create(createUserDto);
    await newUser.$set("roles", [role.id]);
    // await newUser.save()

    return newUser;
  }

  findAll(): Promise<User[]> {
    return this.userModel.findAll({
      include: { all: true },
      order: [['id', 'ASC']]
    });
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({
      where: { email },
      include: {
        model: Role,
        attributes: ["value"],
        through: { attributes: [] },
      },
    });

    return user?.dataValues;
  }

  findOne(id: number): Promise<User | null> {
    return this.userModel.findByPk(id, { include: { all: true } })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { name, email, password } = updateUserDto
    if (!name || !email || !password) {
      throw new NotFoundException('Iltimos barchasini kriting')
    }

    const User = await this.userModel.findByPk(id)
    if (!User) {
      throw new NotFoundException('User not found')
    }

    const existsName = await this.userModel.findOne({ where: { name } })
    if (existsName && existsName.id !== +id) {
      throw new BadRequestException('Bunday name mavjud')
    }

    if (email && email !== User.email) {
      throw new BadRequestException(`Emailni o'zgartirish mumkun emas`)
    }

    const existsPassword = await this.userModel.findOne({ where: { password } })
    if (existsPassword && existsPassword.id !== +id) {
      throw new BadRequestException('Bunday password mavjud')
    }

    const updateUser = await this.userModel.update(
      { name, password },
      { where: { id }, returning: true }
    );

    return updateUser[1][0];
  }

  async remove(id: number) {
    const deleted = await this.userModel.destroy({where: {id}})
    if(!deleted){
      return {message: 'Bunday user mavjud emas'}
    }
    return {message: `user o'chirildi`}
  }
}
