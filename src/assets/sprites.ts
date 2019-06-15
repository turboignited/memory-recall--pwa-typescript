import { Sprite } from "./sprite";
import { SpriteTypes } from "./sprite_types";
import { Loader } from "../utils/loader";
import { AssetType } from "./asset_type";
import { ImageComponent } from "../ui/components";

export interface SpritesConstructorArgs {
    loader: Loader<AssetType>;
}
declare type SpritesJSONResponse = (results: ISpritesJSON | null) => void;


interface ISprite {
    name: string;
    urls: string[];
}
interface ISprites {
    all: ISprite[];
    total: number;
}
interface ISpritesJSON {
    sprites: ISprites;
}
export class Sprites {

    public get sprites(): Sprite[][] {
        return this._sprites;
    }

    private _sprites: Sprite[][] = [];


    public getRandomSprite(type: SpriteTypes): Sprite {
        return new Sprite({
            image: this._sprites[type][Math.floor(Math.random() * this._sprites[type].length)].image
        });
    }
    public getSprite(type: SpriteTypes, index: number): Sprite {
        return this._sprites[type][index];
    }

    public getSpritesJSON(response: SpritesJSONResponse) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "images/sprites/sprites.json", true);
        xhr.onload = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    response(JSON.parse(xhr.responseText) as ISpritesJSON);
                } else {
                    response(null);
                }
            }
        };
        xhr.onerror = () => {
            response(null);
        };
        xhr.send();
    }

    constructor(args: SpritesConstructorArgs) {
        this.getSpritesJSON(
            (response: ISpritesJSON | null) => {
                if (!response) {
                    args.loader.error(AssetType.sprites, true);
                    return;
                }
                args.loader.add(AssetType.sprites, response.sprites.total);
                for (let i = 0; i < response.sprites.all.length; i++) {
                    this._sprites[i] = [];
                    for (let j = 0; j < response.sprites.all[i].urls.length; j++) {
                        const image = ImageComponent({
                            src: response.sprites.all[i].urls[j],
                            alt: `${response.sprites.all[i].name}-${j}`,
                            onerror: () => {
                                args.loader.error(AssetType.sprites);
                            },
                            onload: () => {
                                args.loader.load(AssetType.sprites);
                            }
                        }
                        );
                        this._sprites[i].push(new Sprite({ image: image }));
                    }
                }
            });

    }
}