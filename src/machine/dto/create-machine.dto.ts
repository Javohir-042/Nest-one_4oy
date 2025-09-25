import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateMachineDto {

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt({ message: "CompanyId butun son bolishi kerak"})
    @Min(1)
    @IsNotEmpty()
    companyId: number;
}
