import {BadRequestException, Body, Controller, Get, HttpCode, Post, Req, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

interface AuthenticatedRequest extends Request {
    user: any
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('reset-password')
    @HttpCode(200)
    changePassword(@Body() body: { email: string }) {
        if (!body) {
            throw new BadRequestException("Email is required");
        }
        return this.authService.changePassword(body.email)
    }

    @Post('register')
    register(@Body() body: {
        email: string,
        password: string,
        first_name: string,
        last_name: string,
        carNumber: string,
        tenantName: string,
        phone: string,
        type: string
    }) {
        return this.authService.register(body.email, body.password, body.first_name, body.last_name, body.carNumber, body.tenantName, body.phone, body.type);
    }

    @Post('login')
    login(@Body() body: { email: string, password: string }) {
        return this.authService.login(body.email, body.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Req() req: AuthenticatedRequest) {
        return req.user
    }
}
