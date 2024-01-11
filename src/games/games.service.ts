import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StatusType } from './enums/status-type.enum';
 
@Injectable()
export class GamesService {
    constructor(@InjectRepository(Game) private data: Repository<Game>) { }
 
    async create(dto: CreateGameDto): Promise<Game> {
        try {
        // Définir le statut sur StatusType.OPENED avant de sauvegarder
        dto.status = StatusType.OPENED;
        return await this.data.save(dto);
        } catch (e) {
        // Gérer l'erreur ici (par exemple, en lançant une exception ConflictException)
        throw new ConflictException();
        }
    }
 
    findAll(): Promise<Game[]> {
        return this.data.find();
    }
 
    async findOne(id: number): Promise<Game> {
        const found = await this.data.findOneBy({ id });
        if (!found)
            throw new NotFoundException();
        return found;
    }
 
    async update(id: number, dto: UpdateGameDto): Promise<Game> {
        try {
          // Chercher le jeu existant par son ID
          const existingGame = await this.findOne(id);
     
          // Vérifier si le jeu existe
          if (!existingGame) {
            throw new NotFoundException('Game not found');
          }
     
          // Appliquer les modifications du DTO à l'entité existante
          this.data.merge(existingGame, dto);
     
          // Sauvegarder les modifications
          const updatedGame = await this.data.save(existingGame);
     
          return updatedGame;
        } catch (e) {
          // Gérer l'erreur ici (par exemple, en lançant une exception NotFoundException)
          throw new NotFoundException('Game not found');
        }
      }
 
    async remove(id: number): Promise<void> {
        let done = await this.data.delete(id);
        if (done.affected != 1)
            throw new NotFoundException();
    }
}