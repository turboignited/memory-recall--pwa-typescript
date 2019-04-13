import { View } from "./view";
import { Loader, LoadStatus } from "../utils/loader";
import { ViewType } from "./view_type";
import { App } from "../app";
import { Grid } from "../ui/grid";
import { Rendering } from "../render/rendering";

/**
 * @implements View
 */
export class LoadingView<T> extends View {
    private _percentLoaded: number;

    constructor(type: ViewType, loader: Loader<T>) {
        super(type);
        this._percentLoaded = 0;
        if (loader) {
            loader.setProgressListener((name: T, status: LoadStatus) => {
                this._percentLoaded = loader.percent;
            });
        }
    }

    public onShow(): void {

    }
    public onHide(): void {

    }
    public onDestroy(): void {

    }
    public reset(): void { }


    public render(context: CanvasRenderingContext2D): void {

        if (this.visible) {

            context.clearRect(0, 0, App.dimensions.width, App.dimensions.height);
            Rendering.renderProgressBar({
                context: context,
                height: 100,
                width: App.dimensions.width,
                innerFillColour: "blue",
                outerFillColour: "yellow",
                percent: this._percentLoaded,
                x: 0,
                y: App.dimensions.height - 100
            });
            requestAnimationFrame((time: number) => {
                this.render(context);
            });
        }
    }
    public createCells(grid: Grid): void {
    }




}