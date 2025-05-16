import {IsBoolean, IsOptional, IsString} from "class-validator";

export class CreateNotificationDto {
    @IsString()
    title: string

    @IsString()
    message: string

    @IsOptional()
    @IsBoolean()
    read: boolean
    
    @IsOptional()
    @IsString()
    userId?: string

    @IsString()
    email: string
}
