import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HintsModule } from './hints/hints.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'stratego',
    autoLoadEntities: true,
    synchronize: true
  }),
    GamesModule,
    HintsModule,
    EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

