import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetChatDto {

    @ApiProperty({
        required: false,
        description: 'Last chat id to get new messages from',
        example: 50,
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    last_id?: number

    @ApiProperty({
        required: false,
        default: 10,
        description: 'Number of messages to get',
    })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    limit?: number = 20;

    constructor(data){
        Object.assign(this, data);
    }
}