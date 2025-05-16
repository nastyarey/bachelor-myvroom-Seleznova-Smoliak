import {Body, Controller, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {NotificationService} from './notification.service';
import {CreateNotificationDto} from './dto/create-notification.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('notification')
export class NotificationController {
    constructor(private readonly service: NotificationService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createNotificationDto: CreateNotificationDto) {
        return this.service.create(createNotificationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findOne(@Req() req: any) {
        return this.service.findOne(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/read')
    markAsRead(@Param('id') id: string) {
        return this.service.markAsRead(id)
    }
}
