import { Point } from "./point";
import { Maths } from "./maths";

export interface IDimensionsConstructorArgs {
    width: number;
    height: number;
    maximumWidth: number;
    maximumHeight: number;
}

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

    constructor(args: IDimensionsConstructorArgs) {
        const scale = Math.min(args.maximumWidth / args.width, args.maximumHeight / args.height);
        const gcd = Maths.GreatestCommonDivisor(args.width, args.height);
        this._height = args.height;
        this._width = args.width;
        this._gcd = gcd;
        this._scale = scale;
    }

    public updateScale(maxWidth: number, maxHeight: number): number {
        this._scale = Math.min(maxWidth / this._width, maxHeight / this._height);
        return this._scale;
    }

    public centerPoint(): Point {
        return {
            x: this._width * 0.5,
            y: this._height * 0.5
        }
    }
}