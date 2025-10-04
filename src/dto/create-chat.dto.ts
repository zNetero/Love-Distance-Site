import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChatDto{
    @IsNumber()
    @IsNotEmpty()
    readonly roomId: number;

    @IsString()
    @IsNotEmpty()
    readonly content: string;

}