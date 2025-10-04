import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Room } from 'src/rooms/room.entity';

@Entity('chats') // nome da tabela no PostgreSQL
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;

  @ManyToOne(() => User, user => user.chats, { eager: true, onDelete: 'CASCADE' })
  sender: User;

  @ManyToOne(() => Room, room => room.chats, { onDelete: 'CASCADE' })
  room: Room;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
