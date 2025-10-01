import { Controller, Get, Post, Body} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity'
//test initial route
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    create(@Body() user:User): Promise<User>{
        return this.usersService.create(user);
    }

    @Get()
    findAll(){
        return this.usersService.findAll();
    }
}
