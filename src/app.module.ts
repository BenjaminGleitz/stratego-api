import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HintsModule } from './hints/hints.module';
import { EventsModule } from './events/events.module';
import { AppGateway } from './events/app.gateway';
import { ExpressAdapter } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mariadb',
    host: 'localhost',
    port: 3308,
    username: 'root',
    password: 'C11R01CsC&MARIADB',
    database: 'stratego',
    autoLoadEntities: true,
    synchronize: true
  }),
    ExpressAdapter,
    GamesModule,
    HintsModule,
    EventsModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule { }

