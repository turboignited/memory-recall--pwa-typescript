import { Point } from "./point";
import { Maths } from "./maths";

export class Dimensions {
    private _width: number;
    private _height: number;
    private _scale: number;
    private _gcd: number;

    public get gcd(): number {
        return this._gcd;
    }
    public get width(): number {
        return this._width;
    }
    public get height(): number {
        return this._height;
    }
    public get scale(): number {
        return this._scale;
    }

    constructor(width: number, height: number, maxWidth: number, maxHeight: number) {
        this._width = width;
        this._height = height;
        this._scale = Math.min(maxWidth / width, maxHeight / height);
        this._gcd = Maths.GreatestCommonDivisor(width, height);
    }

    public updateScale(maxWidth: number, maxHeight: number): void {
        this._scale = Math.min(maxWidth / this._width, maxHeight / this._height);
    }

    public centerPoint(): Point {
        return {
            x: this._width * 0.5,
            y: this._height * 0.5
        }
    }
}