import { LocalStorage } from "./local";
import { SpriteTypes } from "../assets/sprite_types";
import { Score } from "./score";

export class Preferences {
    private static readonly _scoreKey: string = "score";
    private static readonly _activeSpriteKey: string = "activeSprite";
    private static readonly _termsKey: string = "termsAndConditions";
    private static _lastSavedScore: Score | undefined;
    public static online: boolean = false;
    public static get lastSavedScore(): Score | undefined {
        return this._lastSavedScore;
    }
    private static readonly _minimumScore: number = 1;
    public static get minimumScore(): number {
        return this._minimumScore;
    }
    /**
     * Should not exceed the amount of available spaces in the game.
     */
    private static _maximumScore: number = 10;

    /**
     * Attempt to parse the score from local storage.
     * Always check that the score is valid before using and proceeding to save again.
     * @param type Which mode was the score saved with
     * @returns Score | null
     */
    public static getScore(type: SpriteTypes): Score | null {
        const score = LocalStorage.getValue(`${this._scoreKey}${type}`);
        if (score != null) {
            const parsed: Score = JSON.parse(score);
            if (parsed.score > this._maximumScore) {
                parsed.score = this._maximumScore;
            } else if (parsed.score < this._minimumScore) {
                parsed.score = this._minimumScore;
            }
            return parsed;
        }
        return null;
    }

    public static getScores(): Score[] {
        let scores: Score[] = [];


        Object.values(SpriteTypes).map((value: string) => {
            const num = parseInt(value);
            if (!isNaN(num)) {
                let score = LocalStorage.getValue(`${this._scoreKey}${num}`);
                let parsed: Score;
                if (score != null) {
                    parsed = JSON.parse(score);
                    if (parsed.score > this._maximumScore) {
                        parsed.score = this._maximumScore;
                    } else if (parsed.score < this._minimumScore) {
                        parsed.score = this._minimumScore;
                    }
                    scores.push(parsed);
                }
            }
        });
        return scores;
    }
    
    public static deleteScore(type: SpriteTypes): void {
        LocalStorage.removeKey(`${this._scoreKey}${type}`);
    }

    public static saveScore(score: Score): void {
        if (score.score >= this._minimumScore && score.score <= this._maximumScore) {
            console.log(`SaveScore: ${score}`);
            const str = JSON.stringify(score, null, 4);
            LocalStorage.setValue(`${this._scoreKey}${score.type}`, str.toString());
            this._lastSavedScore = score;
        }
    }
    /**
     * Terms and Conditions
     */

    public static toggleTermsAndConditions(): void {
        if (this.termsAccepted) {
            LocalStorage.setValue(this._termsKey, "false");
        } else {
            LocalStorage.setValue(this._termsKey, "true");
        }
    }

    public static get termsAccepted(): boolean {
        const accepted = LocalStorage.getValue(this._termsKey);
        if (accepted != null) {
            if (accepted == "true") {
                return true;
            }
        }
        return false;
    }

    /**
     * SpriteTypes
     */

    public static setActiveSprite(type: SpriteTypes): void {
        LocalStorage.setValue(this._activeSpriteKey, type.toString());
    }

    public static get activeSprite(): SpriteTypes {
        const type = LocalStorage.getValue(this._activeSpriteKey);
        if (type != null) {
            const parsed = parseInt(type);
            return parsed;
        }
        return SpriteTypes.Numbers;
    }
}