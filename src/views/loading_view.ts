import { View } from "./view";
import { Loader, LoadStatus } from "../utils/loader";
import { ViewType } from "./view_type";


export class LoadingView extends View {


    private _percentLoaded: number = 0;

    public load(loader: Loader<ViewType>): void {
        if (loader) {
            loader.setProgressListener((name: ViewType, status: LoadStatus) => {
                this._percentLoaded = loader.percent;
            });
        }
    }

    public createUI(): HTMLDivElement {
        const container = document.createElement("div");

        return container;
    }

    public render(context: CanvasRenderingContext2D): void {

        if (this.visible) {

            context.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
            context.fillStyle = "green";

            context.fillRect(0, this.dimensions.height - 100, this.dimensions.width, 100);

            context.fillStyle = "yellow";

            context.fillRect(20, this.dimensions.height - 80, (this.dimensions.width - 40) * this._percentLoaded, 60);


            context.fillStyle = "black";
            context.font = "50px serif";
            context.textAlign = "center";
            context.fillText(`${(this._percentLoaded * 100).toFixed(2)}%`, this.dimensions.centerPoint().x, this.dimensions.centerPoint().y, this.dimensions.width);

            requestAnimationFrame((time: number) => {
                this.render(context);
            });
        }
    }



}