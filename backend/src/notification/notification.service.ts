import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateNotificationDto} from './dto/create-notification.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Notification, NotificationDocument} from "./entities/notification.entity";
import {User, UserDocument} from "../user/entities/user.entity";

@Injectable()
export class NotificationService {
    constructor(@InjectModel(Notification.name) private model: Model<NotificationDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async create(dto: CreateNotificationDto) {
        let user_id: any = dto.userId
        if (!user_id) {
            const user = await this.userModel.findOne({email: dto.email});
            console.log(user)
            if (!user) throw new NotFoundException('Not found user');
            user_id = user._id
        }
        if (!user_id) {
            throw new BadRequestException('Not have id or Email for User');
        }
        const created = new this.model({
            ...dto,
            user_id
        })
        return created.save();
    }


    findOne(userId: string) {
        return this.model.find({user_id: userId}).sort({createdAt: -1}).exec();
    }

    markAsRead(id: string) {
        return this.model.findByIdAndUpdate(id, {read: true}, {new: true})
    }

}
