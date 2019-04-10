import { App } from "./app";
import { Statics } from "./statics";

export class AppControls {
    private _container: HTMLDivElement;
    public get container(): HTMLDivElement {
        return this._container;

    }
    constructor(app: App) {

        const container = document.createElement("div");
        container.style.boxShadow = "0 0 4px black";

        container.style.opacity="0.5"
        container.style.width = `${Statics.Dimensions.width / 5}px`;
        container.style.backgroundColor = "white";

        this._container = container;

    }
}