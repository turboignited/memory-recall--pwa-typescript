import { ViewType } from "./view_type";
import { View } from "./view";
import { LoadingView } from "./loading_view";
import { MainMenuView } from "./main_menu_view";
import { GameView } from "./game_view";
import { PauseView } from "./pause_view";
import { Loader } from "../utils/loader";
import { HelpView } from "./help_view";
import { AssetType } from "../assets/asset_type";
import { FailView } from "./fail_view";
import { SuccessView } from "./success_view";
import { Container } from "../ui/container";

export class Views {
    // Used to keep track of active view
    private _activeView: ViewType | undefined;

    public get activeView(): ViewType | undefined {
        return this._activeView;
    }

    // Used for indexing views by type
    private _views: Map<ViewType, View>;

    public get views(): Map<ViewType, View> {
        return this._views;
    }

    private _context: CanvasRenderingContext2D;

    public get context(): CanvasRenderingContext2D {
        return this._context;
    }

    private _container: Container<ViewType>;

    public get container(): Container<ViewType> {
        return this._container;
    }

    constructor(container: HTMLDivElement, context: CanvasRenderingContext2D, loader: Loader<AssetType>) {
        this._container = new Container<ViewType>(container);
        this._context = context;
        this._views = new Map<ViewType, View>();
        this._views.set(ViewType.Load, new LoadingView<AssetType>(ViewType.Load, this, loader));
        this._views.set(ViewType.Main, new MainMenuView(ViewType.Main, this));
        this._views.set(ViewType.Game, new GameView(ViewType.Game, this));
        this._views.set(ViewType.Pause, new PauseView(ViewType.Pause, this));
        this._views.set(ViewType.Help, new HelpView(ViewType.Help, this));
        this._views.set(ViewType.Success, new SuccessView(ViewType.Success, this));
        this._views.set(ViewType.Fail, new FailView(ViewType.Fail, this));

    }

    /**
     * Destroy all Views
     */
    public destroy(): void {
        this._views.forEach((value) => {
            value.destroy(this._container);
        });
    }
    /**
     * Destroy an individual view
     */
    public destroyView(key: ViewType): void {
        const view = this._views.get(key);
        if (view != undefined) {
            view.destroy(this._container);
        }
    }

    /**
    * Reset an individual view
    */
    public resetView(key: ViewType): void {
        const view = this._views.get(key);
        if (view != undefined) {
            view.reset();
        }
    }
    /**
     * Will hide current activeview before showing, rendering
     * and setting the specified view active
     * @param key Views key to show
     */
    public setView(key: ViewType): void {
        this.showView(key);
        this.renderView(key);
    }

    public getView(key: ViewType): View | undefined {
        return this._views.get(key);
    }

    /**
     * Will show view specified
     * @param key Views key to show
     */
    public showView(key: ViewType): void {
        const view = this._views.get(key);
        if (view != undefined) {
            if (this._activeView != undefined) {
                this.hideView(this._activeView);
            }
            view.show(this._container);
            this._activeView = key;
        }
    }

    public renderView(key: ViewType): void {
        const view = this._views.get(key);
        if (view != undefined) {
            view.render(this._context);
        }
    }

    /**
     * Will hide view specified
     * @param key Views key to hide
     */
    public hideView(key: ViewType): void {
        const view = this._views.get(key);
        if (view != undefined) {
            view.hide(this._container);
        }
    }
}