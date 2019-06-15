import { Maths } from "./maths";

export interface ISizeConstructorArgs {
    width: number;
    height: number;
    gcd?: number;
}
export class Size {
    private _height: number;
    private _width: number;
    private _gcd: number;
    public get height(): number {
        return this._height;
    }
    public get width(): number {
        return this._width;
    }
    public get gcd(): number {
        return this._gcd;
    }
    constructor(args: ISizeConstructorArgs) {
        this._width = args.width;
        this._height = args.height;
        this._gcd = args.gcd ? args.gcd : Maths.GreatestCommonDivisor(args.width, args.height);
    }
}