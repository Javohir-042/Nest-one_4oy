import { userStub } from "../test/stubs/user.stub";

export const UsersService = jest.fn().mockReturnValue({
    create: jest.fn().mockResolvedValue(userStub()),
    findAll: jest.fn().mockResolvedValue([userStub()]),
    findone: jest.fn().mockResolvedValue(userStub()),
    remove: jest.fn().mockReturnValue({
        message: "foydalanuchi o'chirildi",
    })
})