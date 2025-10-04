import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Couple } from '../couples/couples.entity'
import { Exclude } from 'class-transformer';


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
}

