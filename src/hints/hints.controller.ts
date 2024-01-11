// Clément ROLLIN
import { Controller, Get } from '@nestjs/common';
import { HintsService } from './hints.service';

@Controller('hints')
export class HintsController {
    constructor(private readonly hintsService: HintsService) {}

    @Get('random-winning-game')
    async getRandomWinningGame() {
        return this.hintsService.findRandomWinningGame();
    }
}