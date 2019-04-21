import { ContainerComponent } from "../ui/components";

export abstract class Layout {

    private _element: HTMLDivElement;
    public get element(): HTMLDivElement {
        return this._element;
    }
    private _display: string;
    public get display(): string {
        return this._display;
    }
    constructor(display: string) {
        const element = ContainerComponent();
        element.style.display = "none";
        element.style.width = "720px";
        element.style.height = "1280px";
        this._display = display;
        this._element = element;
    }

    public hide(): boolean {
        if (this._element.style.display === "none") {
            return false;
        } else {
            this._element.style.display = "none";
            return true;
        }
    }

    public show(): boolean {
        if (this._element.style.display === this._display) {
            return false;
        } else {
            this._element.style.display = this._display;
            return true;
        }
    }
}