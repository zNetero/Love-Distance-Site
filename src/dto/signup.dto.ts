import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsEmail({}, { message: 'Email is not valid' })
    email: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    password: string;
}