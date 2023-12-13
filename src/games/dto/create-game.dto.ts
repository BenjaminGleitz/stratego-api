import { IsDefined } from "class-validator";
import { PlayerType } from "../enums/player-type.enum";
import { Transform } from "class-transformer";
export class CreateGameDto {

    @Transform(() => undefined) // Utilisez cette ligne pour ignorer la valeur fournie dans la requête
    id: number;

    @IsDefined()
    flavor: PlayerType;
}
