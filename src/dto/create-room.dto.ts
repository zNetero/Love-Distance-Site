import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from '../rooms/room-type.enum';
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateRoomDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @ValidateIf(object => object.type != RoomType.PERSONAL)
    name: string;

    @ApiProperty({ required: true})
    @IsArray()
    @ArrayNotEmpty()
    members: string[];

    @ApiProperty({ required: true, default: RoomType.PERSONAL })
    @IsEnum(RoomType)
    @ValidateIf(object => object.type)
    type: RoomType;
}