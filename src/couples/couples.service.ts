import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 
import { Couple } from './couples.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class CouplesService {
    constructor(
        @InjectRepository(Couple)
        private coupleRepository: Repository<Couple>,
        private usersService: UsersService,
    ) {}

    async create(currentUserId: number, partnerEmail: string): Promise<Couple> {
        const currentUser = await this.usersService.findById(currentUserId);
        const partner = await this.usersService.findOne(partnerEmail);


        if(!currentUser || !partner){
            throw new UnauthorizedException('One or more users not found');
        }
        
        if(currentUser.id === partner.id){
            throw new BadRequestException('You cannot create a couple with yourself');
        }

        const existingCouple = await this.coupleRepository.findOne({
            where: [
                { user1: { id: currentUser.id  } },
                { user2: { id: currentUser.id  } },
                { user1: { id: partner.id  } },
                { user2: { id: partner.id  } },
            ]
        })

        if(existingCouple){
            throw new BadRequestException('One or more users are already in a couple with this user');
        }

        const newCouple = this.coupleRepository.create({
            user1: currentUser,
            user2: partner,
        });

        return this.coupleRepository.save(newCouple);
    }
}


