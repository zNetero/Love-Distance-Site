import { Module } from '@nestjs/common';
import { CouplesService } from './couples.service';
import { CouplesController } from './couples.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Couple } from './couples.entity';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Couple]), UsersModule],
  providers: [CouplesService, JwtService],
  controllers: [CouplesController]
})
export class CouplesModule {}
