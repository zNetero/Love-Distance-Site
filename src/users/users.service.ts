import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';

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

    async create(createUserDto: CreateUserDto): Promise<User>{
        const newUser = this.usersRepository.create(createUserDto);

        const salt = await bcrypt.genSalt();
        newUser.password = await bcrypt.hash(newUser.password, salt);

        return this.usersRepository.save(newUser);
    }

    async findById(id: number): Promise<User | null>{
        return this.usersRepository.findOneBy({id})
    }
}
