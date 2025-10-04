import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    OneToMany,
    JoinTable,
    CreateDateColumn,
    UpdateDateColumn,
    AfterLoad,
} from 'typeorm';
import { User } from '../users/users.entity';
import { RoomType } from './room-type.enum';
import { Chat } from '../chat/chat.entity';

@Entity('rooms')
export class Room {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100})
    name: string;

    @Column({
        type: 'enum',
        enum: RoomType,
        default: RoomType.PERSONAL,
    })
    type: RoomType;

    @OneToMany(() => Chat, chat => chat.room)
    chats: Chat[]

    @ManyToMany(() => User, user => user.rooms, { eager: true })
    @JoinTable({
    name: 'room_members',
    joinColumn: {
      name: 'room_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  members: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @AfterLoad()
  updateNameForPersonal(){
    if(this.type === RoomType.PERSONAL && this.members && this.members.length === 2){
        
        const otherMembmer = this.members[0]
        this.name = otherMembmer.name;
    }
  }

}