import {MiddlewareConsumer, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {LoggerMiddleware} from "./common/middleware/logger.middleware";
import { NotificationModule } from './notification/notification.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost:27017/vroombd'), UserModule, AuthModule, NotificationModule,],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*')
    }
}
