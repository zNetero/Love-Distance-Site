import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    findAll(): Promise<User[]>{
        return this.usersRepository.find();
    }

    async findOne(email: string): Promise<User | null>{
        return this.usersRepository.findOneBy({ email });
    }

    async create(user:User): Promise<User>{
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        return this.usersRepository.save(user);
    }
}
