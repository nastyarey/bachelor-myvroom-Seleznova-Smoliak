import {Body, Controller, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {UserService} from './user.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {v4 as uuidv4} from 'uuid'
import {extname} from 'path'
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('photo')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/photo',
            filename: (req, file, cb) => {
                const uniqueName = uuidv4() + extname(file.originalname)
                cb(null, uniqueName)
            },
        }),
    }))
    async uploadAvatar(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: any
    ) {
        const userId = req.user.id
        console.log(file)
        const avatarUrl = `/uploads/photo/${file.filename}`

        const updatedUser = await this.userService.updateAvatar(userId, avatarUrl)

        return {
            message: 'photo updated',
            avatar: avatarUrl,
            user: updatedUser,
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update')
    async updateUser(@Req() req: any, @Body() dto: UpdateUserDto) {
        const userId = req.user.id

        return await this.userService.updateUser(userId, dto)

    }
}
