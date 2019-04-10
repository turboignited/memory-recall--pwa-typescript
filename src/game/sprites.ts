import { sprites } from "../assets/sprites.json";

import { Dimensions } from "../utils/dimensions";

import { Maths } from "../utils/maths";
import { Loader } from "../utils/loader";
import { ViewType } from "../views/view_type";
import { Sprite } from "./sprite";
import { Point } from "../utils/point";
import { SpriteTypes } from "../assets/sprite_types";
import { Statics } from "../statics";


export class Sprites {

    private _spriteSize: number = 0;
    private _sprites: Sprite[][];
    public get spriteSize(): number {
        return this._spriteSize;
    }
    public get sprites(): Sprite[][] {
        return this._sprites;
    }

    constructor() {
        this._spriteSize = Maths.GreatestCommonDivisor(Statics.Dimensions.width, Statics.Dimensions.height);
        this._sprites = [];
    }

    public getRandomSprite(type: SpriteTypes): Sprite {
        const index = Math.floor(Math.random() * this._sprites[type].length);
        const sprite = new Sprite(this._sprites[type][index].image, this._sprites[type][index].position);
        return sprite;
    }
    public getSprite(type: SpriteTypes, index: number): Sprite {
        return this._sprites[type][index];
    }
    /**
     * Must be called before all other functions to ensure images
     * are ready and there were no errors on the network.
     * If there are errors then the loader owner should handle it.
     * @param loader Loader to inform of progress
     * @param type ViewType to associate this instance with
     */
    public load(loader: Loader<ViewType>, type: ViewType): void {
        loader.add(type, sprites.total);
        for (let i = 0; i < sprites.all.length; i++) {
            this._sprites[i] = [];
            for (let j = 0; j < sprites.all[i].urls.length; j++) {
                const image = new Image();
                image.onload = (ev: any) => {
                    image.onerror = null;
                    image.onload = null;
                    loader.load(type);
                }
                image.onerror = (ev: any) => {
                    image.onerror = null;
                    image.onload = null;
                    loader.error(type);
                }

                image.src = sprites.all[i].urls[j];
                this._sprites[i].push(new Sprite(image, new Point(-100, -100)));

            }
        }
    }
}