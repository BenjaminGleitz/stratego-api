import { IsDefined } from "class-validator";
import { PlayerType } from "../enums/player-type.enum";
import { Transform } from "class-transformer";
import { StatusType } from "../enums/status-type.enum";
export class CreateGameDto {

    // Benjamin-GLEITZ
    @Transform(() => undefined)
    id: number;

    @IsDefined()
    flavor: PlayerType;

    @IsDefined()
    redPlayerName: String;

    bluePlayerName: String;

    @IsDefined()
    status: StatusType;

    @IsDefined()
    blueSetup: String;

    @IsDefined()
    redSetup: String;

    @IsDefined()
    currentBoard: String;
}
