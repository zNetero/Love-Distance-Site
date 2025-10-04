import {
    Entity,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Couple {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, {eager: true})//load user automatically
    @JoinColumn()
    user1: User;

    @OneToOne(() => User, {eager: true})
    @JoinColumn()
    user2: User;

    @CreateDateColumn()
    createdAt: Date;
}

