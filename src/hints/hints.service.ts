// Clément ROLLIN
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hint } from './entities/hints.entity';

@Injectable()
export class HintsService {
    constructor(
        @InjectRepository(Hint)
        private hintsRepository: Repository<Hint>,
    ) {}

    async findRandomWinningGame(): Promise<Hint> {
        const winningGames = await this.hintsRepository.find({
          where: {
            win_lose: 'win'
          },
          order: {
            date_played: 'DESC'
          },
          take: 10
        });
      
        if (winningGames.length === 0) {
          throw new Error('Aucune partie gagnante disponible.');
        }
      
        const randomIndex = Math.floor(Math.random() * winningGames.length);
        return winningGames[randomIndex];
    }
}