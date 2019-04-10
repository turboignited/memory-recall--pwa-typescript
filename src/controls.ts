import { App } from "./app";
import { Statics } from "./statics";

export class AppControls {
    private _container: HTMLDivElement;
    private _height: number = 0;
    public get height(): number {
        return this._height;
    }
    public get container(): HTMLDivElement {
        return this._container;

    }
    constructor(app: App) {
        this._height = Statics.Dimensions.height * 0.1;
        const container = document.createElement("div");
        container.style.height = `${this._height}px`;
        container.style.backgroundColor = "blue";

        this._container = container;

    }
}