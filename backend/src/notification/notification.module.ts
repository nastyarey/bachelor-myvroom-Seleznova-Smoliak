import {Module} from '@nestjs/common';
import {NotificationService} from './notification.service';
import {NotificationController} from './notification.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Notification, NotificationSchema} from "./entities/notification.entity";
import {User, UserSchema} from "../user/entities/user.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Notification.name, schema: NotificationSchema},
        ]),
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema},
        ])
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule {
}
