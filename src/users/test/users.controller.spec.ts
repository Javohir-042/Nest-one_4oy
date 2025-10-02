import { JwtService } from "@nestjs/jwt";
import { UsersController } from "../users.controller"
import { UsersService } from "../users.service"
import { Test } from '@nestjs/testing';
import { User } from "../model/user.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { userStub } from "./stubs/user.stub";

jest.mock("../users.service")
describe("Users controller test", () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService, JwtService],
        }).compile();
        usersController = moduleRef.get(UsersController);
        usersService = moduleRef.get(UsersService);

        jest.clearAllMocks()
    });
    test("User controller should be defined", () => {
        expect(usersController).toBeDefined();
    });
    it("User service should be defined", () => {
        expect(usersService).toBeDefined();
    });

    describe("create user test", () => {
        describe("when create user is called", () => {
            let user: User
            let createUserDto: CreateUserDto;
            const dto = userStub()
            beforeAll(async () => {
                createUserDto = {
                    name: dto.name,
                    email: dto.email,
                    password: dto.password,
                    value: dto.value,
                };
                user = await usersController.create(createUserDto);
                console.log(user);
            });
            it("then it should call usersService", () => {
                expect(usersService.create).toHaveBeenCalledWith(createUserDto);
            });
            it("then it should return user", () => {
                expect(user).toEqual(userStub());
            })
        });
    });


    describe("find all users test", () => {
        describe("when find all user is called", () => {
            let users: User[];
            beforeAll(async () => {
               
                users = await usersController.findAll();
            });
            it("then it should call usersService", () => {
                expect(usersService.findAll).toHaveBeenCalledWith();
            });
            it("then it should return user", () => {
                expect(users).toEqual([userStub()]);
            })
        });
    });

});
