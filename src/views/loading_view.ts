import { View } from "./view";
import { Loader, LoadStatus } from "../utils/loader";
import { ViewType } from "./view_type";
import { Rendering } from "../render/rendering";
import { Views } from "./views";
import { Layout } from "../ui/layout";

/**
 * @implements View
 */
export class LoadingView<T> extends View {
    private _percentLoaded: number;

    constructor(type: ViewType, views: Views, loader: Loader<T>) {
        super(type, views);
        this._percentLoaded = 0;
        if (loader) {
            loader.setProgressListener((name: T, status: LoadStatus) => {
                this._percentLoaded = loader.percent;
            });
        }
    }

    public createLayout(): Layout | void {

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

            context.clearRect(
                0,
                context.canvas.height * 0.5 - 50,
                context.canvas.width,
                100);
            context.fillStyle = "black";
            context.font = "40px serif";
            context.textAlign = "center";
            context.fillText(
                `${(this._percentLoaded * 100).toFixed(2)}%`,
                context.canvas.width * 0.5,
                context.canvas.height * 0.5,
                context.canvas.width);
            Rendering.renderProgressBar({
                context: context,
                height: 100,
                width: context.canvas.width,
                innerFillColour: "blue",
                outerFillColour: "yellow",
                percent: this._percentLoaded,
                x: 0,
                y: context.canvas.height - 100
            });
            requestAnimationFrame((time: number) => {
                this.render(context);

            });
        }
    }
    // public create(container: Container<ViewType>): void {

    // }
}