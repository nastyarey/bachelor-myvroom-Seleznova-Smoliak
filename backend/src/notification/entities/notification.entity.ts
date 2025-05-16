import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type NotificationDocument = Notification & Document

@Schema({timestamps: true})
export class Notification {
    @Prop({required: true})
    title: string
    @Prop({required: true})
    message: string
    @Prop({required: true})
    user_id: string
    @Prop({required: true})
    type: string
    @Prop({default: false})
    read: boolean
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)