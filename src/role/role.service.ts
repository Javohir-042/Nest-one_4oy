import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./model/role.model";
@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private readonly roleModel: typeof Role) { }

  async create(createRoleDto: CreateRoleDto) {
    // const {value} = createRoleDto                        // ikkinchi usulix
    // createRoleDto.value = value.toUpperCase()

    const { value, description } = createRoleDto

    if(!value || !description){
      throw new NotFoundException("Iltimos barchasini kiriting");
    }

    const values = await this.roleModel.findOne({ where: { value } })
    if (values) {
      throw new NotFoundException('Bunday value bor')
    }

    return this.roleModel.create({
      ...createRoleDto,
      value: createRoleDto.value.toUpperCase(),
    });
  }

  findAll() {
    return this.roleModel.findAll({ include: { all: true }, order: [['id', 'ASC']] });
  }

  async findOne(id: number): Promise<Role | null> {
    const roles = await this.roleModel.findByPk(id)
    if (!roles) {
      throw new NotFoundException("Role not found")
    }

    return roles;
  }

  findRoleByValue(value: string) {
    return this.roleModel.findOne({ where: { value: value.toUpperCase() } });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { value } = updateRoleDto

    const roles = await this.roleModel.findByPk(id)
    if (!roles) {
      throw new NotFoundException('Roles not found')
    }

    if (value) {
      const roleValue = await this.roleModel.findOne({ where: { value } })
      if (roleValue && roleValue.id !== +id) {
        throw new BadRequestException('Bunday value mavjud')
      }
    }

    const updateRole = await this.roleModel.update(updateRoleDto, { where: { id }, returning: true })

    return updateRole[1][0];
  }

  async remove(id: number) {
    const deleteRole = await this.roleModel.destroy({where:{id}})
    if(!deleteRole){
      return {message: 'Role not found'}
    }
    return {message: `O'chirildi`}
  }
}
