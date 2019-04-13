import { Views } from "./views/views";
import { Grid } from "./ui/grid";
import { Dimensions } from "./utils/dimensions";
import { Assets } from "./assets/assets";
import { Preferences } from "./storage/preferences";
import { ViewType } from "./views/view_type";
import { Loader } from "./utils/loader";
import { AssetType } from "./assets/asset_type";

/**
 * Entry point.
 */
export class App {
    private static _context: CanvasRenderingContext2D;
    private static _views: Views;
    private static _dimensions: Dimensions;
    private static _grid: Grid;
    private static _assets: Assets;
    private static _preferences: Preferences;

    public static get context(): CanvasRenderingContext2D {
        return this._context;
    }

    public static get views(): Views {
        return this._views;
    }

    public static get dimensions(): Dimensions {
        return this._dimensions;
    }

    public static get grid(): Grid {
        return this._grid;
    }

    public static get assets(): Assets {
        return this._assets;
    }

    public static get preferences(): Preferences {
        return this._preferences;
    }

    public static get maximumWidth(): number {
        return window.innerWidth - 20;
    }

    public static get maximumHeight(): number {
        return window.innerHeight - 20;
    }

    constructor(context: CanvasRenderingContext2D, width: number, height: number, loader: Loader<AssetType>) {
        const dimensions = new Dimensions(width, height, App.maximumWidth, App.maximumHeight);
        App._dimensions = dimensions
        App._context = context;
        App._grid = new Grid(context.canvas, dimensions);
        App._preferences = new Preferences();
        App._assets = new Assets(loader);
        App._views = new Views(loader);
        App._views.setView(ViewType.Load);
        context.canvas.width = width;
        context.canvas.height = height;
        context.canvas.style.transformOrigin = "0 0"; //scale from top left
        context.canvas.style.transform = `scale(${dimensions.scale})`;
        context.canvas.style.borderRadius = "4px";
        window.onresize = () => {
            App._dimensions.updateScale(App.maximumWidth, App.maximumHeight);
            App._grid.container.style.width = `${App._dimensions.width * App._dimensions.scale}px`;
            App._grid.container.style.height = `${App._dimensions.height * App._dimensions.scale}px`;
            App._context.canvas.style.transformOrigin = "top left"; //scale from top left
            App._context.canvas.style.transform = `scale(${App._dimensions.scale})`;
        };

    }
}