import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CompanyModule } from "./company/company.module";
import { Company } from "./company/models/company.models";
import { DriverModule } from "./driver/driver.module";
import { BuilderModule } from "./builder/builder.module";
import { Builder } from "./builder/model/builder.model";
import { MachineModule } from "./machine/machine.module";
import { Machine } from "./machine/model/machine.model";
import { MachineDriverModule } from "./machine_driver/machine_driver.module";
import { Driver } from "./driver/models/driver.models";
import { MachineDriver } from "./machine_driver/model/machine_driver.model";
import { RoleModule } from "./role/role.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { FileService } from './file/file.service';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "node:path";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../static")
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      // models: [Company, Builder, Machine, Driver, MachineDriver],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CompanyModule,
    DriverModule,
    BuilderModule,
    MachineModule,
    MachineDriverModule,
    RoleModule,
    
  ],
  controllers: [],
  providers: [FileService],
})
export class AppModule {}
