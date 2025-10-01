import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
//File to config database
@Module({
  imports: [TypeOrmModule.forRoot({
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
  UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
