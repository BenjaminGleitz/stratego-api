import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	// Configurer CORS
	app.enableCors({
		origin: '*', // Remplacez cela par votre origine front-end
		//methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		//credentials: true,
	});
	await app.listen(3000);
}
bootstrap();
