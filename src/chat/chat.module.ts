import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatGateway } from './chat-gateway';
import { ChatsService } from './chat.service';
import { RoomsModule } from '../rooms/rooms.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    forwardRef(() => RoomsModule), 
  ],
  providers: [ChatGateway, ChatsService],
  exports: [ChatsService],
})
export class ChatModule {}