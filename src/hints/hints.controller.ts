import { Controller, Get } from '@nestjs/common';
import { PieceConfiguration, HintsService } from './hints.service';

@Controller('hints')
export class HintsController {
    constructor(private hintsService: HintsService) {}

    @Get('pieces')
    getPieceConfigurations(): PieceConfiguration[] {
        return this.hintsService.getPieceConfigurations();
    }

    @Get('random-winning-game')
    async getRandomWinningGame() {
        return this.hintsService.findRandomWinningGame();
    }
}
