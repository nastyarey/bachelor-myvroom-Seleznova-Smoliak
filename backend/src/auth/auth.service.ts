import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../user/entities/user.entity";
import {Model} from "mongoose";
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService
    ) {
    }

    async changePassword(email: string) {
        const findUser = await this.userModel.findOne({email})
        if (!findUser) throw new NotFoundException('Not found user');
    }

    async register(email: string, password: string, first_name: string, last_name: string, carNumber: string, tenantName: string, phone: string, type: string) {
        const isUser = await this.userModel.findOne({email});

        if (isUser) {
            throw new BadRequestException('User already exists');
        }
        const hash = await bcrypt.hash(password, 10)
        const newUser = new this.userModel({
            email,
            password: hash,
            first_name,
            last_name,
            carNumber,
            tenantName,
            phone,
            type
        });
        const dataUser = await newUser.save();
        const payload = {sub: dataUser.id, email: dataUser.email}
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async login(email: string, password: string) {
        const user = await this.userModel.findOne({email});
        if (!user) {
            throw new BadRequestException('Login or password incorrect');
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new BadRequestException('Login or password incorrect');
        }
        const payload = {sub: user.id, email: user.email};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
