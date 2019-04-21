import { Loader } from "../utils/loader";
import { Sprites } from "./sprites";
import { AssetType } from "./asset_type";

export class Assets {
    private static _sprites: Sprites;
    public static get sprites(): Sprites {
        return this._sprites;
    }

    public static load(loader: Loader<AssetType>): void {
        this._sprites = new Sprites(loader);
    }
}