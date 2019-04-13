import { ViewType } from "./view_type";
import { Grid } from "../ui/grid";

export abstract class View {
    private _type: ViewType;
    private _visible: boolean;
    public get visible(): boolean {
        return this._visible;
    }
    public get type(): ViewType {
        return this._type;
    }

    constructor(type: ViewType) {
        this._type = type;
        this._visible = false;
    }
    /**
     * Call to load images and other assets for the view
     * @param loader Required to inform about progress
     */
    /**
     * Call to show the HTML contents of this view
     */
    public show(grid: Grid): void {
        if (this._visible) {
            return;
        }
        this._visible = true;
        if (!grid.contains(this.type)) {
            this.createCells(grid);
        }
        grid.showCells(this.type);
        this.onShow();
    }

    /**
     * Call to hide the HTML contents of this view
     */
    public hide(grid: Grid): void {
        if (!this._visible) {
            return;
        }
        this._visible = false;
        grid.hideCells(this.type);
        this.onHide();
    }

    /**
     * Call to destroy
     */
    public destroy(): void {
        this._visible = false;
        this.onDestroy();
    }

    public abstract reset(): void;
    public abstract render(context: CanvasRenderingContext2D): void;
    public abstract createCells(grid: Grid): void;
    public abstract onShow(): void;
    public abstract onHide(): void;
    public abstract onDestroy(): void;
}
