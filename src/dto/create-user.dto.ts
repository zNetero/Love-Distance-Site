import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'Name must be a text'})
    @IsNotEmpty({ message: 'Name is required'})
    name: string;

    @IsEmail({},{ message: 'Email is not valid'})
    email: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters'})
    password: string;
}