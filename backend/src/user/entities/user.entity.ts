import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

export type UserDocument = User & Document

@Schema({timestamps: true})
export class User {
    @Prop({required: true, unique: true})
    email: string
    @Prop({required: true})
    password: string
    @Prop({required: true})
    first_name: string
    @Prop({required: true})
    last_name: string
    @Prop({required: true})
    carNumber: string
    @Prop({required: true})
    type: string
    @Prop({default: null})
    tenantName: string
    @Prop({required: true})
    phone: string
    @Prop({default: null})
    photo?: string
}

export const UserSchema = SchemaFactory.createForClass(User)
