import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from 'path'
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({
        origin: "http://localhost:3000",
        credentials: true,
    })
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    })
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(process.env.PORT ?? 3002);

    console.log(`🚀 Server ready at http://localhost:${process.env.PORT ?? 3002}`)
}

bootstrap();
