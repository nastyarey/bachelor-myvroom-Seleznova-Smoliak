import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./entities/user.entity";
import {Model} from "mongoose";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
    }

    async updateAvatar(userId: string, avatarUrl: string) {
        return this.userModel.findByIdAndUpdate(
            userId,
            {photo: avatarUrl},
            {new: true}
        )
    }

    async updateUser(userId: string, dataUser: UpdateUserDto) {
        return this.userModel.findByIdAndUpdate(userId, dataUser, {new: true});
    }
}
