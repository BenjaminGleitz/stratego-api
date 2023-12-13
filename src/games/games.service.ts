import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class GamesService {

	constructor(@InjectRepository(Game) private data: Repository<Game>) { }

	async create(dto: CreateGameDto): Promise<Game> {
		try {
			return await this.data.save(dto);
		} catch (e) {
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
			await this.data.update(id, dto);
		} catch (e) {
			throw new ConflictException();
		}
		return this.findOne(id);
	}

	async remove(id: number): Promise<void> {
		let done = await this.data.delete(id);
		if (done.affected != 1)
			throw new NotFoundException();
	}
}
