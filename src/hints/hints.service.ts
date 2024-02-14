// hints.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hint } from './entities/hints.entity';

@Injectable()
export class HintsService {

    configurations: PieceConfiguration[] = [
        { type: 'Flag', name: '🚩', isRed: true, coordinates: { row: 6, col: 0 } },
        { type: 'Scout', name: '⛺', isRed: true, coordinates: { row: 6, col: 1 } },
        { type: 'Scout', name: '⛺', isRed: true, coordinates: { row: 6, col: 2 } },
        { type: 'Scout', name: '⛺', isRed: true, coordinates: { row: 6, col: 3 } },
        { type: 'Scout', name: '⛺', isRed: true, coordinates: { row: 6, col: 4 } },
        { type: 'Scout', name: '⛺', isRed: true, coordinates: { row: 6, col: 5 } },
        { type: 'Scout', name: '⛺', isRed: true, coordinates: { row: 6, col: 6 } },
        { type: 'Scout', name: '⛺', isRed: true, coordinates: { row: 6, col: 7 } },
        { type: 'Scout', name: '⛺', isRed: true, coordinates: { row: 9, col: 4 } },
        { type: 'Infantry', name: '⚔️', isRed: true, coordinates: { row: 6, col: 8 } },
        { type: 'Infantry', name: '⚔️', isRed: true, coordinates: { row: 6, col: 9 } },
        { type: 'Infantry', name: '⚔️', isRed: true, coordinates: { row: 7, col: 0 } },
        { type: 'Infantry', name: '⚔️', isRed: true, coordinates: { row: 7, col: 1 } },
        { type: 'Infantry', name: '⚔️', isRed: true, coordinates: { row: 7, col: 2 } },
        { type: 'Infantry', name: '⚔️', isRed: true, coordinates: { row: 7, col: 3 } },
        { type: 'Cavalry', name: '🏇', isRed: true, coordinates: { row: 7, col: 4 } },
        { type: 'Cavalry', name: '🏇', isRed: true, coordinates: { row: 7, col: 5 } },
        { type: 'Cavalry', name: '🏇', isRed: true, coordinates: { row: 7, col: 6 } },
        { type: 'Cannon', name: '🚀', isRed: true, coordinates: { row: 7, col: 7 } },
        { type: 'Cannon', name: '🚀', isRed: true, coordinates: { row: 7, col: 8 } },
        { type: 'Bomb', name: '💣', isRed: true, coordinates: { row: 7, col: 9 } },
        { type: 'Bomb', name: '💣', isRed: true, coordinates: { row: 8, col: 0 } },
        { type: 'Bomb', name: '💣', isRed: true, coordinates: { row: 8, col: 1 } },
        { type: 'Bomb', name: '💣', isRed: true, coordinates: { row: 8, col: 2 } },
        { type: 'Bomb', name: '💣', isRed: true, coordinates: { row: 9, col: 6 } },
        { type: 'Bomb', name: '💣', isRed: true, coordinates: { row: 9, col: 7 } },
        { type: 'Bomb', name: '💣', isRed: true, coordinates: { row: 9, col: 8 } },
        { type: 'Bomb', name: '💣', isRed: true, coordinates: { row: 9, col: 9 } },
        { type: 'Bomb', name: '💣', isRed: true, coordinates: { row: 9, col: 2 } },
        { type: 'Bomb', name: '💣', isRed: true, coordinates: { row: 9, col: 3 } },
        { type: 'Bomb', name: '💣', isRed: true, coordinates: { row: 9, col: 5 } },
        { type: 'Sergeant', name: 'SER', isRed: true, coordinates: { row: 8, col: 3 } },
        { type: 'Lieutenant', name: 'LIEU', isRed: true, coordinates: { row: 8, col: 4 } },
        { type: 'Lieutenant', name: 'LIEU', isRed: true, coordinates: { row: 8, col: 5 } },
        { type: 'Captain', name: 'CAP', isRed: true, coordinates: { row: 8, col: 6 } },
        { type: 'Captain', name: 'CAP', isRed: true, coordinates: { row: 8, col: 7 } },
        { type: 'Commander', name: 'COM', isRed: true, coordinates: { row: 8, col: 8 } },
        { type: 'Colonel', name: 'COL', isRed: true, coordinates: { row: 8, col: 9 } },
        { type: 'General', name: 'GEN', isRed: true, coordinates: { row: 9, col: 0 } },
        { type: 'Marshal', name: 'MAR', isRed: true, coordinates: { row: 9, col: 1 } }
    ];

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

    getPieceConfigurations(): PieceConfiguration[] {
        return this.configurations;
    }
}

export interface PieceConfiguration {
    type: string;
    name: string;
    isRed: boolean;
    coordinates: { row: number; col: number }; // Coordonnées de la pièce dans le tableau
}
