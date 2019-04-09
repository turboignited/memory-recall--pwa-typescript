import { LocalStorage } from "./local";

export class Score {
    private readonly _key: string = "score";
    private readonly _minimum: number;
    private readonly _maximum: number;
    private _current: number;
    public get maximum(): number {
        return this._maximum;
    }
    public get minimum(): number {
        return this._minimum;
    }
    constructor(minimum: number, maximum: number) {
        this._minimum = minimum;
        this._maximum = maximum;
        this._current = this.getScore();
    }

    public getScore(): number {
        const score = LocalStorage.getValue(this._key);
        if (score != null) {
            const parsed = parseInt(score);
            if (parsed > this._maximum || parsed < this._minimum) {
                return this._minimum;
            }
            return parsed;
        }
        return this._minimum;
    }

    public increaseScore(): number {
        const next = this._current + 1;
        if (next < this._maximum) {
            this._current++;
            this.saveCurrent();
        }
        return this._current;
    }

    public resetScore(): void {
        this._current = this._minimum;
        this.saveCurrent();
    }

    public saveCurrent(): void {
        LocalStorage.setValue(this._key, this._current.toString());
    }
}