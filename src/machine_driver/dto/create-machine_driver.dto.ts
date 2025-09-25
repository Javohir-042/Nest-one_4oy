import { IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateMachineDriverDto {
    // @IsPassportNumber("UZ")
    @IsInt({message: "machineId Butun son bolishi kerak "})
    @IsNotEmpty()
    @Min(1)
    machineId: number;
    @IsInt({message: "driverId butun son bolishi kerak"})
    @Min(1)
    @IsNotEmpty()
    driverId: number;
}
