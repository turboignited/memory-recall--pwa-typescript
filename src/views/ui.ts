import { Dimensions } from "../utils/dimensions";

export class UI {
    private _container!: HTMLDivElement;
    private _visible: boolean;
    public get container(): HTMLDivElement {
        return this._container;
    }
    constructor(dimensions: Dimensions, container: HTMLDivElement) {
        this._container = container;
        container.style.display = "none";
        this._visible = false;
        this.update(dimensions);
    }

    public show(): void {
        if (!this._visible) {
            // this._container.style.display = "initial";

            this._container.style.display = "flex";
            this._container.style.flexDirection = "column";
            this._container.style.alignContent = "center";
            this._container.style.justifyContent = "space-between";
            this._visible = true;
        }
    }

    public hide(): void {
        if (this._visible) {
            this._container.style.display = "none";
            this._visible = false;
        }
    }

    public update(dimensions: Dimensions): void {
        this._container.style.maxWidth = `${dimensions.width * dimensions.scale}px`;
        this._container.style.maxHeight = `${dimensions.height * dimensions.scale}px`;
    }
}