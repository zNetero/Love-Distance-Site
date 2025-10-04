import { Module, forwardRef } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from '../chat/chat.module';
import { Room } from './room.entity';
import { UsersModule } from '../users/users.module'; 
import { User } from '../users/users.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Room, User]),
        forwardRef(() =>ChatModule),
        forwardRef(() => UsersModule),
    ],
    controllers: [RoomsController],
    providers: [RoomsService],
})
export class RoomsModule {}
