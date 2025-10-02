import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { DriverService } from "./driver.service";
import { CreateDriverDto } from "./dto/create-driver.dto";
import { UpdateDriverDto } from "./dto/update-driver.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("driver")
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @UseInterceptors(FileInterceptor)
  create(
    @Body() createDriverDto: CreateDriverDto,
    @UploadedFile() image: any
) {
    return this.driverService.create(createDriverDto, image);
  }

  @Get()
  findAll() {
    return this.driverService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.driverService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.driverService.remove(+id);
  }
}
