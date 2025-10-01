import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService} from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signIn(username: string, pass: string): Promise<any>{
        const user = await this.usersService.findOne(username);
        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(pass, user.password);
        if(!isMatch){
            throw new UnauthorizedException('Invalid credentials');
        }

        const { password, ...result } = user;
        //Generate and return JWT token
        return result;
        
    }
}
