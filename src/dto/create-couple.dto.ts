import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCoupleDto {
    @IsEmail({}, { message: 'Email is not valid' })
    @IsNotEmpty()
    partnerEmail: string
}