import { SpriteTypes } from "../assets/sprite_types";
import { LocalStorage } from "./local";

export interface IScore {
    type: SpriteTypes;
    score: number;
    time: number;
}

export class Scores {
    private static readonly _scoreKey: string = "score";

    private static _lastSavedScore: IScore | undefined;
    public static get lastSavedScore(): IScore | undefined {
        return this._lastSavedScore;
    }

    public static getScore(type: SpriteTypes): IScore {
        const score = LocalStorage.getValue(`${this._scoreKey}${type}`);
        if (score != null) {
            const parsed: IScore = JSON.parse(score);
            return parsed;
        } else {
            return {
                score: 0,
                time: 0,
                type: type
            }
        }
    }

    public static getScores(): IScore[] {
        let scores: IScore[] = [];
        Object.values(SpriteTypes).map((value: string) => {
            const num = parseInt(value);
            if (!isNaN(num)) {
                let score = LocalStorage.getValue(`${this._scoreKey}${num}`);
                if (score != null) {
                    const parsed = JSON.parse(score);
                    scores.push(parsed);
                }
            }
        });
        return scores;
    }

    public static deleteScore(type: SpriteTypes): void {
        LocalStorage.removeKey(`${this._scoreKey}${type}`);
    }

    public static saveScore(score: IScore): void {
        const str = JSON.stringify(score, null, 4);
        LocalStorage.setValue(`${this._scoreKey}${score.type}`, str.toString());
        this._lastSavedScore = score;
    }
}