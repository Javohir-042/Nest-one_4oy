import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class SigninUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

}
