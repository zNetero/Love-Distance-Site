import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CouplesService } from './couples.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateCoupleDto } from '../dto/create-couple.dto';

@Controller('couples')
export class CouplesController {
    constructor(private readonly couplesService: CouplesService){}
    
    @UseGuards(AuthGuard)
    @Post()
    create(@Request() req, @Body() createCoupleDto: CreateCoupleDto) {
        const userId = req.user.sub;
        return this.couplesService.create(userId, createCoupleDto.partnerEmail);
    }
}
