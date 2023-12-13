import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { PlayerType } from "../enums/player-type.enum";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "enum", enum: PlayerType})
    player: PlayerType;
}
