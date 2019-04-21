import { Views } from "./views/views";
import { Assets } from "./assets/assets";
import { Loader } from "./utils/loader";
import { AssetType } from "./assets/asset_type";
import { ViewType } from "./views/view_type";

/**
 * Entry point.
 */
export class App {
    private _views: Views;

    public get views(): Views {
        return this._views;
    }


    constructor(context: CanvasRenderingContext2D, container: HTMLDivElement) {
        const loader = new Loader<AssetType>();

        loader.setCompletedListener(() => {
            loader.reset();
            setTimeout(() => {
                this._views.setView(ViewType.Main);

            }, 0);
        });

        loader.setErrorListener(() => {
            loader.reset();
            this.quit(true, "Could not load assets.");
        });
        const views = new Views(container, context, loader);


        views.setView(ViewType.Load);

        Assets.load(loader);

        this._views = views;
    }

    public quit(error: boolean, reason: string): void {
        if (error) {
            console.error(`App quitting: $${reason}`)
        } else {
            console.log(`App quitting: $${reason}`)
        }
        this._views.destroy();
    }
}