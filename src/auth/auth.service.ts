import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService} from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, pass: string): Promise<{ access_token: string}>{
        const user = await this.usersService.findOne(email);
        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        if(!isMatch){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload  = { sub: user.id, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        }

    }
}