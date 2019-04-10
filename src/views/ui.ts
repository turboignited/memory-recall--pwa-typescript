export class UI {
    private _container!: HTMLDivElement;
    private _visible: boolean;
    public get container(): HTMLDivElement {
        return this._container;
    }
    constructor(container: HTMLDivElement) {
        this._container = container;
        container.style.display = "none";
        this._visible = false;
    }

    public show(): void {
        if (!this._visible) {
            // this._container.style.display = "initial";

            this._container.style.display = "initial";

            this._visible = true;
        }
    }

    public hide(): void {
        if (this._visible) {
            this._container.style.display = "none";
            this._visible = false;
        }
    }
}