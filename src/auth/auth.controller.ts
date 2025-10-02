import { Body, Controller, Post, HttpCode, HttpStatus, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignUpDto } from '../dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ access_token: string }>{
        return this.authService.signUp(signUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>){
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user
    }
}
