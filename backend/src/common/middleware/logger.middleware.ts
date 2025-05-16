import {Injectable, NestMiddleware} from '@nestjs/common'
import {NextFunction, Request, Response} from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const date = new Date();
        console.log(`[${req.method}] ${req.originalUrl} Time: ${date.getDay()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
        next()
    }
}
