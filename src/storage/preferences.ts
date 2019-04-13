import { LocalStorage } from "./local";
import { SpriteTypes } from "../assets/sprite_types";

export class Preferences {
    private readonly _scoreKey: string = "score";
    private readonly _activeSpriteKey: string = "activeSprite";
    private readonly _termsKey: string = "termsAndConditions";
    private _minimumScore: number = 2;
    private _maximumScore: number = 2;

    /**
     * Scores
     */

    public getScore(type: SpriteTypes): number {
        const score = LocalStorage.getValue(`${this._scoreKey}${type}`);
        if (score != null) {
            const parsed = parseInt(score);
            if (parsed > this._maximumScore || parsed < this._minimumScore) {
                return this._minimumScore;
            }
            return parsed;
        }
        return this._minimumScore;
    }

    public increaseScore(type: SpriteTypes): number {
        const score = this.getScore(type);
        const next = score + 1;
        if (next < this._maximumScore) {
            this.saveScore(type, next);
        }
        return score;
    }

    public resetScore(type: SpriteTypes): void {
        this.saveScore(type, this._minimumScore);
    }

    public saveScore(type: SpriteTypes, value: number): void {
        LocalStorage.setValue(`${this._scoreKey}${type}`, value.toString());
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
        LocalStorage.setValue(this._activeSpriteKey, SpriteTypes[type]);
    }

    public get activeSprite(): SpriteTypes {
        const type = LocalStorage.getValue(this._activeSpriteKey);
        if (type != null) {
            const parsed = parseInt(type);
            if (parsed > Math.round(Object.keys(SpriteTypes).length / 2)) {
                return 0 as SpriteTypes;
            }
            return parsed as SpriteTypes;
        }
        return 0 as SpriteTypes;
    }
}