import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from "bcrypt";
import { SigninUserDto } from '../users/dto/signin-user.dto copy';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/model/user.model';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    private async generateToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
            roles: user.roles,
        };
        return { token: this.jwtService.sign(payload) }
    }
    
    async signup(createUserDto: CreateUserDto) {
        const candidate = await this.userService.findUserByEmail(
            createUserDto.email
        );
        console.log("salom")
        if (candidate) {
            throw new ConflictException("Bunday foydalanuvchi mavjud");
        }
        
        const hashedPassword = await bcrypt.hash(createUserDto.password, 7)
        createUserDto.password = hashedPassword;
        createUserDto.value = "USER";
        
        const newUser = await this.userService.create(createUserDto);
        return newUser;
    }
    
    
    async signin(signinUserDto: SigninUserDto) {
        const user = await this.userService.findUserByEmail(
            signinUserDto.email
        );
        if (!user) {
            throw new UnauthorizedException("Email yoki parol noto'g'ri");
        }
        
        const verifyPassword = await bcrypt.compare(signinUserDto.password, user.password)

        if (!verifyPassword) {
            throw new UnauthorizedException("Email yoki parol noto'g'ri");
        }
        
        
        return this.generateToken(user);
    }
}
