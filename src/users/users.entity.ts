import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, OneToMany } from 'typeorm';
import { Couple } from '../couples/couples.entity'
import { Exclude } from 'class-transformer';
import { Room } from '../rooms/room.entity';
import { Chat } from '../chat/chat.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn()//auto increment
    id: number;

    @Column()
    name: string;

    @Column({ unique: true})
    email: string;

    @Exclude()
    @Column()
    password: string;

    @OneToOne(() => Couple, couple => couple.user1, {nullable: true})
    couple1: Couple

    @OneToOne(() => Couple, couple => couple.user2, {nullable: true})
    couple2: Couple

    @ManyToMany(() => Room, room => room.members)
    rooms: Room[]

    @OneToMany(() => Chat, (chat) => chat.sender)
    chats: Chat[]
}

