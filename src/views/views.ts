import { ViewType } from "./view_type";
import { View } from "./view";
import { LoadingView } from "./loading_view";
import { MainMenuView } from "./main_menu_view";
import { GameView } from "./game_view";
import { PauseView } from "./pause_view";
import { Loader } from "../utils/loader";
import { App } from "../app";
import { HelpView } from "./help_view";
import { AssetType } from "../assets/asset_type";
import { FailView } from "./fail_view";
import { SuccessView } from "./success_view";

export class Views {
    // Used to keep track of active view
    private _activeView!: ViewType;
    // Used for indexing views by type
    private _views: Map<ViewType, View>;

    constructor(loader: Loader<AssetType>) {
        this._views = new Map<ViewType, View>();
        this._views.set(ViewType.Load, new LoadingView<AssetType>(ViewType.Load, loader));
        this._views.set(ViewType.Main, new MainMenuView(ViewType.Main));
        this._views.set(ViewType.Game, new GameView(ViewType.Game));
        this._views.set(ViewType.Pause, new PauseView(ViewType.Pause));
        this._views.set(ViewType.Help, new HelpView(ViewType.Help));
        this._views.set(ViewType.Success, new SuccessView(ViewType.Success));
        this._views.set(ViewType.Fail, new FailView(ViewType.Fail));
    }

    /**
     * Destroy all Views
     */
    public quit(): void {
        this._views.forEach((value) => {
            value.destroy();
        });
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
            view.show(App.grid);
            this._activeView = key;
        }
    }

    public renderView(key: ViewType): void {
        const view = this._views.get(key);
        if (view != undefined) {
            view.render(App.context);
        }
    }

    /**
     * Will hide view specified
     * @param key Views key to hide
     */
    public hideView(key: ViewType): void {
        const view = this._views.get(key);
        if (view != undefined) {
            view.hide(App.grid);

        }
    }
}