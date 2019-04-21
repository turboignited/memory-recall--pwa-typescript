import { Layout } from "./layout";

export declare type ContainerClickHandler = (x: number, y: number) => void;

export class Container<T> {

    private _element: HTMLDivElement;
    private _layouts: Map<T, Layout>;
    private _activeLayout: T | undefined;
    public get layouts(): Map<T, Layout> {
        return this._layouts;
    }
    public get element(): HTMLDivElement {
        return this._element;
    }
    public get activeLayout(): T | undefined {
        return this._activeLayout;
    }
    constructor(element: HTMLDivElement) {
        this._element = element;
        this._layouts = new Map<T, Layout>();
    }

    public setClickHandler(handler: ContainerClickHandler): void {
        if (this._element.onclick == null) {
            this._element.onclick = (ev: MouseEvent) => {
                handler(ev.offsetX, ev.offsetY);
            }
        }
    }

    public addLayout(t: T, layout: Layout): void {
        if (!this._layouts.has(t)) {
            layout.element.id = `Layout: ${t.toString()}`;
            this._element.appendChild(layout.element);
            this._layouts.set(t, layout);
        }
    }

    public layoutExists(t: T): boolean {
        return this._layouts.has(t);
    }

    public deleteLayout(t: T): boolean {
        const layout = this._layouts.get(t);
        if (layout != undefined) {
            this._layouts.delete(t);
            this._element.removeChild(layout.element);
            return true;
        }
        return false;
    }

    public showLayout(t: T): boolean {
        if (this._activeLayout == t) {
            return false;
        }
        const layout = this._layouts.get(t);
        if (layout != undefined) {
            if (this._activeLayout != undefined) {
                this.hideLayout(this._activeLayout);
            }
            this._activeLayout = t;
            return layout.show();
        }
        return false;
    }

    public hideLayout(t: T): boolean {
        const layout = this._layouts.get(t);
        if (layout != undefined) {
            return layout.hide();
        }
        return false;
    }
}