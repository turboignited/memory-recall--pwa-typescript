import { Views } from "./views/views";
import { Assets } from "./assets/assets";
import { Loader } from "./utils/loader";
import { AssetType } from "./assets/asset_type";
import { ViewType } from "./views/view_type";
import { Size } from "./utils/size";

export interface IAppConstructorArgs {
    context: CanvasRenderingContext2D;
    ui: HTMLDivElement;
    bar: HTMLDivElement;
    uiSize: Size;
    barSize: Size;
}

export class App {
    private static _views: Views;

    public static get views(): Views {
        return this._views;
    }

    constructor(args: IAppConstructorArgs) {
        const loader = new Loader<AssetType>();
        App._views = new Views({
            ui: args.ui,
            context: args.context,
            uiSize: args.uiSize,
            barSize: args.barSize,
            bar: args.bar,
            loader: loader
        });
        App._views.setView(ViewType.Load);

        loader.setCompletedListener(() => {
            loader.reset();
            App._views.setView(ViewType.Main);
        });

        loader.setErrorListener(() => {
            loader.reset();
            this.quit(true, "Could not load assets.");
        });

        Assets.load(loader);
    }

    public quit(error: boolean, reason: string): void {
        if (error) {
            console.error(`App quitting: $${reason}`)
        } else {
            console.log(`App quitting: $${reason}`)
        }
        App._views.destroy();
    }
}