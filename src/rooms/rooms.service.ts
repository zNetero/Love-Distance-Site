import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository} from '@nestjs/typeorm';
import { Room } from './room.entity';
import { CreateRoomDto } from '../dto/create-room.dto';
import { User } from '../users/users.entity';
@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room) 
        private roomRepository: Repository<Room>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(userId: number, createRoomDto: CreateRoomDto): Promise<Room>{
        
        const allMembersIds = [... new Set([userId, ...createRoomDto.members])]
        
        const members = await this.userRepository.findBy({ id: In(allMembersIds)})
        
        if(members.length !== allMembersIds.length){
            throw new NotFoundException('One or more users not found');
        }

        const newRoom = this.roomRepository.create({
            ...createRoomDto,
            members,
        });

        return this.roomRepository.save(newRoom);
    }
    
    async getByRequest( userId: number ): Promise<Room[]> {
        return this.roomRepository.find({
            where: {
                members: {
                    id: userId,
                }
            }
        })
    }
};