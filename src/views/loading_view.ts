import { View } from "./view";
import { Loader, ILoadStatus, ILoadProgressArgs } from "../utils/loader";
import { ImageComponent } from "../ui/components";
import { Rendering } from "../render/rendering";
import { Point } from "../utils/point";
import { Colours } from "../utils/colours";
import { Grid } from "../ui/grid";
import { Bar } from "../ui/bar";
import { Size } from "../utils/size";

export interface ILoadingViewConstructorArgs<T> {
    loader?: Loader<T>
}

/**
 * @implements View
 */
export class LoadingView<T> extends View {
    private _loadingPercent: number;
    private _loadingImage: HTMLImageElement;
    private _visible: boolean = false;
    constructor(args: ILoadingViewConstructorArgs<T>) {
        super();
        this._loadingPercent = 0.0;
        this._loadingImage = ImageComponent({ alt: "Icon", src: "images/icon.png" });
        if (args.loader) {
            args.loader.setProgressListener((args2: ILoadProgressArgs<T>) => {
                this._loadingPercent = args2.percent;
            });
        }
    }
    public populateBar(bar: Bar): void { }

    public populateGrid(grid: Grid): void {

    }
    public show(): void {

        this._visible = true;
    }
    public hide(): void {
        this._visible = false;
    }
    public destroy(): void {

        this._visible = false;
    }
    public reset(): void { }


    public render(context: CanvasRenderingContext2D, size: Size): void {
        if (this._visible) {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            context.fillStyle = Colours.IconBackground;
            context.fillRect(0, 0, size.width, size.height);

            Rendering.renderCircleStroke({
                center: { x: context.canvas.width * 0.5, y: context.canvas.height * 0.5 },
                context: context,
                radius: size.gcd * 2,
                progress: this._loadingPercent,
                strokeColour: Colours.IconPrimary,
                strokeWidth: 10
            });


            const s = size.gcd * 2;
            context.drawImage(this._loadingImage, context.canvas.width * 0.5 - s * 0.5, context.canvas.height * 0.5 - s * 0.5, s, s);
            requestAnimationFrame((time: number) => {
                this.render(context, size);
            });

        }

    }
}