import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  forwardRef(() => RoomsModule),
],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
