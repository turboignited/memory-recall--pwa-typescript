import { Point } from "../utils/point";

export interface SpriteConstructorArgs {
    image: HTMLImageElement;
}

export class Sprite {

    private _image: HTMLImageElement;
    private _alpha: number = 0;
    public get alpha(): number {
        return this._alpha;
    }
    public set alpha(value: number) {
        this._alpha = value;
    }
    public get image(): HTMLImageElement {
        return this._image;
    }

    constructor(args: SpriteConstructorArgs) {
        this._image = args.image;
    }
}