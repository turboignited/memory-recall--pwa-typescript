import { Grid } from "./grid";

export interface IGridContainerArgs {
    container: HTMLDivElement;
}
export declare type PositionClickHandler = (x: number, y: number) => void;

export class GridContainer<T> {
    private _container: HTMLDivElement;

    public get container(): HTMLDivElement {
        return this._container;
    }

    private _grids: Map<T, Grid>;

    constructor(args: IGridContainerArgs) {
        this._container = args.container;
        this._grids = new Map<T, Grid>();
    }


    public setClickHandler(handler: PositionClickHandler): void {
        this._container.onclick = (ev: MouseEvent) => {
            handler(ev.offsetX, ev.offsetY);
        }
    }
    public hasGrid(type: T): boolean {
        return this._grids.has(type);
    }

    public addGrid(type: T, grid: Grid): void {
        if (!this._grids.has(type)) {
            this._container.appendChild(grid.element);
            this._grids.set(type, grid);
        }
    }

    public showGrid(type: T): void {
        const grid = this._grids.get(type);
        if (grid != null) {
            grid.show();
        }
    }

    public hideGrid(type: T): void {
        const grid = this._grids.get(type);
        if (grid != null) {
            grid.hide();
        }
    }

    public deleteGrid(type: T): void {
        const grid = this._grids.get(type);
        if (grid != null) {
            this._container.removeChild(grid.element);
            this._grids.delete(type);
        }
    }
}