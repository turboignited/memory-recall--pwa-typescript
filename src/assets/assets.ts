import { Loader } from "../utils/loader";
import { Sprites } from "./sprites";
import { AssetType } from "./asset_type";

export class Assets {
    private _sprites: Sprites;
    public get sprites(): Sprites {
        return this._sprites;
    }
    constructor(loader: Loader<AssetType>) {
        this._sprites = new Sprites(loader);
    }
}