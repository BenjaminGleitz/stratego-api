// Clément ROLLIN
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hint } from './entities/hints.entity';
import { HintsController } from './hints.controller';
import { HintsService } from './hints.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hint])],
  controllers: [HintsController],
  providers: [HintsService],
})
export class HintsModule {}