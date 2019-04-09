import { Point } from "../utils/point";

export class Sprite {

    private _image: HTMLImageElement;
    private _alpha: number = 0;
    public position: Point;
    public get alpha(): number {
        return this._alpha;
    }
    public set alpha(value: number) {
        this._alpha = value;
    }
    public get image(): HTMLImageElement {
        return this._image;
    }

    constructor(image: HTMLImageElement, position: Point) {
        this._image = image;
        this.position = position;
    }
}