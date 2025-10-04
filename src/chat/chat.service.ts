import { Injectable } from '@nestjs/common';
import { CreateChatDto } from '../dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { Repository, FindManyOptions, LessThan } from 'typeorm';
import { GetChatDto } from '../dto/get-chat.dto';

@Injectable()
export class ChatsService{
    constructor(
        @InjectRepository(Chat)
        private chatRepository: Repository<Chat>
    ){}

    async create(senderId: number, createChatDto: CreateChatDto): Promise<Chat>{
        const newChat = this.chatRepository.create({
            content: createChatDto.content,
            sender: { id: senderId },
            room: { id: createChatDto.roomId },
        })

        return this.chatRepository.save(newChat);
    }

    async findAll(roomId: number, getChatDto: GetChatDto): Promise<Chat[]>{
        const findOptions: FindManyOptions<Chat> = {
            where: {
                room: {id: roomId},
            },
            order: {
                createdAt: 'DESC',
            },
            take: getChatDto.limit,
            relations: ['sender'],
        };

        if(getChatDto.last_id){
            findOptions.where = {
                ...findOptions.where,
                id: LessThan(getChatDto.last_id),
            }
        }
        return this.chatRepository.find(findOptions);
    }
}