import { Role } from "../../../role/model/role.model";
import { User } from "../../model/user.model";

export const userStub = ()=> {
    return {
        id: 1,
        name: "user1",
        email: "user1@gmail.com",
        password: "1234567",
        is_active: true,
        value: 'admin',
    };
};