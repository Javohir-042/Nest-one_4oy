import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: 'user1',
    description: 'Foydalanuvchi ismi'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'user1@mail.uz',
    description: 'Foydalanuvchi email'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Uzbek!$t0n',
    description: 'Foydalanuvchi passwordi'
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'admin',
    description: 'Foydalanuvchi value'
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}
