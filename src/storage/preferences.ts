import { LocalStorage } from "./local";
import { SpriteTypes } from "../assets/sprite_types";
import { App } from "../app";

export interface Score {
    type: SpriteTypes;
    score: number;
    time: number;
}

export class Preferences {
    private readonly _scoreKey: string = "score";
    private readonly _activeSpriteKey: string = "activeSprite";
    private readonly _termsKey: string = "termsAndConditions";
    private _lastSavedScore: Score | undefined;
    public get lastSavedScore(): Score | undefined {
        return this._lastSavedScore;
    }
    private readonly _minimumScore: number = 1;
    public get minimumScore(): number {
        return this._minimumScore;
    }
    /**
     * Should not exceed the amount of available spaces in the game.
     */
    private _maximumScore: number = (App.dimensions.width / App.dimensions.gcd) * ((App.dimensions.height / App.dimensions.gcd) - 2);

    /**
     * Attempt to parse the score from local storage.
     * Always check that the score is valid before using and proceeding to save again.
     * @param type Which mode was the score saved with
     * @returns Score | null
     */
    public getScore(type: SpriteTypes): Score | null {
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

    public getScores(): Score[] {
        let scores: Score[] = [];
        let score = LocalStorage.getValue(`${this._scoreKey}${SpriteTypes.Numbers}`);
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

        score = LocalStorage.getValue(`${this._scoreKey}${SpriteTypes.Letters}`);
        if (score != null) {
            parsed = JSON.parse(score);
            if (parsed.score > this._maximumScore) {
                parsed.score = this._maximumScore;
            } else if (parsed.score < this._minimumScore) {
                parsed.score = this._minimumScore;
            }
            scores.push(parsed);
        }
        return scores;
    }
    public deleteScore(type: SpriteTypes): void {
        LocalStorage.removeKey(`${this._scoreKey}${type}`);
    }

    public saveScore(score: Score): void {
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

    public toggleTermsAndConditions(): void {
        if (this.termsAccepted) {
            LocalStorage.setValue(this._termsKey, "false");
        } else {
            LocalStorage.setValue(this._termsKey, "true");
        }
    }

    public get termsAccepted(): boolean {
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

    public setActiveSprite(type: SpriteTypes): void {
        LocalStorage.setValue(this._activeSpriteKey, type.toString());
    }

    public get activeSprite(): SpriteTypes {
        const type = LocalStorage.getValue(this._activeSpriteKey);
        if (type != null) {
            const parsed = parseInt(type);
            return parsed;
        }
        return SpriteTypes.Numbers;
    }
}