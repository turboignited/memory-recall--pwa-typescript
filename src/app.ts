import { Canvas } from "./render/canvas";
import { View } from "./views/view";
import { Dimensions } from "./utils/dimensions";
import { MainMenuView } from "./views/main_menu_view";
import { Loader } from "./utils/loader";
import { ViewType } from "./views/view_type";
import { LoadingView } from "./views/loading_view";
import { GameView } from "./views/game_view";
import { PauseView } from "./views/pause_view";

/**
 * Entry point.
 * Initializes and interacts with the views associated with the app
 */
export class App {
    private _canvas: Canvas;
    private _dimensions: Dimensions;
    private _views: Map<ViewType, View>;
    private _activeView!: ViewType;

    public get canvas(): Canvas {
        return this._canvas;
    }

    public get views(): Map<ViewType, View> {
        return this._views;
    }
    public get activeView(): ViewType {
        return this._activeView;
    }

    public get dimensions(): Dimensions {
        return this._dimensions;
    }

    constructor(width: number, height: number, maxWidth: number, maxHeight: number, context: CanvasRenderingContext2D) {
        this._dimensions = new Dimensions(width, height, maxWidth, maxHeight);
        this._canvas = new Canvas(this._dimensions, context);
        this._views = new Map<ViewType, View>();
        this._views.set(ViewType.Load, new LoadingView(ViewType.Load, this));
        this._views.set(ViewType.Main, new MainMenuView(ViewType.Main, this));
        this._views.set(ViewType.Game, new GameView(ViewType.Game, this));
        this._views.set(ViewType.Pause, new PauseView(ViewType.Pause, this));
    }


    /**
     * @param loader Loader to be passed to views to report on 
     * download progress
     */
    public load(loader: Loader<ViewType>): void {
        if (loader != null) {
            this._views.forEach((value) => {
                value.load(loader);
            });
        }
    }

    /**
     * Destroy all Views
     */
    public quit(): void {
        this._views.forEach((value) => {
            value.destroy();
        });
    }

    public resize(width: number, height: number): void {
        this._dimensions.updateScale(width, height);
        this._canvas.setDimensions(this._dimensions);
        this._views.forEach((value) => {
            value.resize(this._dimensions);
        });
        this.renderView(this._activeView);
    }

    /**
     * Will hide current activeview before showing, rendering
     * and setting the specified view active
     * @param key Views key to show
     */
    public setView(key: ViewType): void {
        this.hideActiveView();
        this.showView(key);
        this.renderView(key);
    }

    public getView(key: ViewType): View | undefined {
        return this._views.get(key);
    }
    /**
     * Will hide activeview
     */
    public hideActiveView(): void {
        this.hideView(this._activeView);
    }
    /**
     * Will show view specified
     * @param key Views key to show
     */
    public showView(key: ViewType): void {
        const view = this._views.get(key);
        if (view != undefined) {
            view.show();
            this._activeView = key;
        }
    }
    /**
     * Will render view specified
     * @param key Views key to render
     */
    public renderView(key: ViewType): void {
        const view = this._views.get(key);
        if (view != undefined) {
            view.render(this.canvas.context);
        }
    }

    /**
     * Will hide view specified
     * @param key Views key to hide
     */
    public hideView(key: ViewType): void {
        const view = this._views.get(key);
        if (view != undefined) {
            view.hide();
        }
    }
}
