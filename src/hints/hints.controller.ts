// Clément ROLLIN
import { Controller, Get } from '@nestjs/common';
import { HintsService } from './hints.service';

@Controller('hints')
export class HintsController {
    constructor(private readonly hintsService: HintsService) {}
    @Get()
    async getRandomWinningGame() {
        return this.hintsService.findRandomWinningGame();
    }
}