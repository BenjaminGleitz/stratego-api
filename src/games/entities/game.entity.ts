import { Entity, PrimaryGeneratedColumn, Column, Index} from "typeorm";
import { PlayerType } from "../enums/player-type.enum";
import { StatusType } from "../enums/status-type.enum";

@Entity()
export class Game {

    // Benjamin-GLEITZ
    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'player', type: "enum", enum: PlayerType, default: PlayerType.RED})
    player: PlayerType;

    @Column({name: 'red_player_name', length: 100})
    redPlayerName: String;

    @Column({name: 'blue_player_name', length: 100, nullable: true})
    bluePlayerName: String;

    @Column({name: 'status', type: "enum", enum: StatusType, default: StatusType.OPENED})
    status: StatusType;

    @Column({name: 'blue_setup', nullable: true})
    blueSetup: String;

    @Column({name: 'red_setup',nullable: true})
    redSetup: String;

    @Column({name: 'currentBoard', default: "test"})
    currentBoard: String;
}
