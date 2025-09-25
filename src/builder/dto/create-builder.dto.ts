import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateBuilderDto {
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsString()
    @IsNotEmpty()
    birth_day: Date;

    @IsNumber()
    @IsNotEmpty()
    salary: number;

    @IsInt({ message: "companyId butun son bolishi kerak "})
    @Min(1)
    @IsNotEmpty()
    companyId: number;
}
