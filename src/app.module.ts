import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CouplesModule } from './couples/couples.module';
import { ChatModule } from './chat/chat.module';
//File to config database
@Module({
  imports: [ConfigModule.forRoot({isGlobal: true,}),
  
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'giordano123',
    database: 'lovedistance',
    autoLoadEntities: true,
    synchronize: true
  }),
  AuthModule,
  UsersModule,
  CouplesModule,
  ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
