import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../users.service"
import { userStub } from "./stubs/user.stub";
import { JwtService } from "@nestjs/jwt";
import { RoleService } from "../../role/role.service";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "../model/user.model";
import { Role } from "../../role/model/role.model";
import { CreateUserDto } from "../dto/create-user.dto";

describe("Users service", () => {
    let usersService: UsersService;
    const mockUsersModel = {
        create: jest.fn().mockImplementation(userStub),
        findOne: jest.fn().mockImplementation(userStub),
        findAll: jest.fn().mockImplementation(() => [userStub()]),
        findByPk: jest.fn().mockImplementation(userStub),
        destroy: jest.fn(),
    };

    const mockRolesModel = {
        findOne: jest.fn().mockImplementation((value: string) => "USER"),
    };

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [
                UsersService,
                JwtService,
                RoleService,
                {
                    provide: getModelToken(User),
                    useValue: mockUsersModel,
                },
                {
                    provide: getModelToken(Role),
                    useValue: mockRolesModel,
                },
            ],
        }).compile();
        usersService = moduleRef.get(UsersService);
    });

    it("should be defined", () => {
        expect(usersService).toBeDefined();
    });

    describe("createuser", () => {
        describe("when create User is called", () => {
            let createUserDto: CreateUserDto;
            let newUser: User;
            const dto = userStub()

            beforeEach(async () => {
                createUserDto = {
                    name: dto.name,
                    email: dto.email,
                    password: dto.password,
                    value: dto.value,
                };
                newUser = await usersService.create(createUserDto);
                console.log(newUser);
            });
            it("should be create new user", async () => {
                expect(newUser).toMatchObject({
                    ...userStub(),
                });
            });
        });
    });


    describe("findOne", () => {
        describe("when findOne is called", () => {
            test("then it should return user", async () => {
                const user = await usersService.findOne(userStub().id!);
                expect(user).toEqual(userStub());
            });
        });
    });

    describe("findAll", () => {
        describe("when findAll is called", () => {
            test("then it should return user", async () => {
                expect(await usersService.findAll()).toEqual([userStub()]);
            })
        })
    })

    describe("findUserByEmail", () => {
        describe("when findOne is colled", () => {
            test("Then it should call usersService", async () => {
                const user = await usersService.findUserByEmail(userStub().email!);
                expect(user).toEqual(userStub());
            });
        });
    });

});