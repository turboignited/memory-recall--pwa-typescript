import { Bar } from "./bar";

export interface IBarContainerArgs {
    container: HTMLDivElement;
}

export class BarContainer<T> {
    private _container: HTMLDivElement;

    public get container(): HTMLDivElement {
        return this._container;
    }

    private _bars: Map<T, Bar>;

    constructor(args: IBarContainerArgs) {
        this._container = args.container;
        this._bars = new Map<T, Bar>();
    }
    
    public hasBar(type: T): boolean {
        return this._bars.has(type);
    }

    public addBar(type: T, bar: Bar): void {
        if (!this._bars.has(type)) {
            this._container.appendChild(bar.element);
            this._bars.set(type, bar);
        }
    }

    public showBar(type: T): void {
        const bar = this._bars.get(type);
        if (bar != null) {
            bar.show();
        }
    }

    public hideBar(type: T): void {
        const bar = this._bars.get(type);
        if (bar != null) {
            bar.hide();
        }
    }

    public deleteBar(type: T): void {
        const bar = this._bars.get(type);
        if (bar != null) {
            this._container.removeChild(bar.element);
            this._bars.delete(type);
        }
    }
}