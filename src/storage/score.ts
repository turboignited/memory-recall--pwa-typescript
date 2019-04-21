import { SpriteTypes } from "../assets/sprite_types";

export interface Score {
    type: SpriteTypes;
    score: number;
    time: number;
}