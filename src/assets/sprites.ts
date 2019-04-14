import { sprites } from "./sprites.json";
import { Sprite } from "./sprite";
import { SpriteTypes } from "./sprite_types";
import { Loader } from "../utils/loader";
import { Point } from "../utils/point";
import { AssetType } from "./asset_type";

export class Sprites {

    public get sprites(): Sprite[][] {
        return this._sprites;
    }

    private _sprites: Sprite[][] = [];


    public getRandomSprite(type: SpriteTypes): Sprite {
        const index = Math.floor(Math.random() * this._sprites[type].length);
        const sprite = new Sprite(this._sprites[type][index].image, this._sprites[type][index].position);
        return sprite;
    }
    public getSprite(type: SpriteTypes, index: number): Sprite {
        return this._sprites[type][index];
    }

    constructor(loader: Loader<AssetType>) {
        loader.add(AssetType.sprites, sprites.total);
        for (let i = 0; i < sprites.all.length; i++) {
            this._sprites[i] = [];
            if (sprites.all[i].name === "letters") {
                if (sprites.all[i].urls.length !== 26) {
                    console.error("Wrong amount of letter sprites specified in json file.");
                }
            } else if (sprites.all[i].name === "numbers") {
                if (sprites.all[i].urls.length !== 10) {
                    console.error("Wrong amount of numbers sprites specified in json file.");
                }
            }
            for (let j = 0; j < sprites.all[i].urls.length; j++) {
                const image = new Image();
                image.onload = (ev: any) => {
                    image.onerror = null;
                    image.onload = null;
                    loader.load(AssetType.sprites);
                }

                image.onerror = (ev: any) => {
                    image.onerror = null;
                    image.onload = null;
                    loader.error(AssetType.sprites);
                }

                image.src = sprites.all[i].urls[j];
                this._sprites[i].push(new Sprite(image, new Point(-100, -100)));
            }
        }
    }
}