import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateDriverDto {

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    driver_license: string;
}
