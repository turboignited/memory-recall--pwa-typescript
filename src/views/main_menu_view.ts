import { View } from "./view";
import { Loader } from "../utils/loader";
import { ViewType } from "./view_type";
import { App } from "../app";
import { Statics } from "../statics";


export class MainMenuView extends View {


    constructor(type: ViewType, app: App) {
        super(type, app);
    }

    public load(loader: Loader<ViewType>): void {

    }

    public render(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, Statics.Dimensions.width, Statics.Dimensions.height);
    }
}
