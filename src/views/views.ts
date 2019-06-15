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
import { GridContainer } from "../ui/grid_container";
import { SettingsView } from "./settings_view";
import { Grid } from "../ui/grid";
import { DiagnosticsView } from "./diagnostics_view";
import { Size } from "../utils/size";
import { BarContainer } from "../ui/bar_container";
import { Bar } from "../ui/bar";

export interface IViewsConstructorArgs {
    ui: HTMLDivElement;
    bar: HTMLDivElement;
    context: CanvasRenderingContext2D;
    loader: Loader<AssetType>;
    uiSize: Size;
    barSize: Size;
}
export class Views {
    // Used to keep track of active view
    private _activeView: ViewType = ViewType.None;

    public get activeView(): ViewType {
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

    private _gridContainer: GridContainer<ViewType>;

    public get gridContainer(): GridContainer<ViewType> {
        return this._gridContainer;
    }
    private _barContainer: BarContainer<ViewType>;
    public get barContainer(): BarContainer<ViewType> {
        return this._barContainer;
    }
    private _uiSize: Size;

    public get uiSize(): Size {
        return this._uiSize;
    }
    private _barSize: Size;
    public get barSize(): Size {
        return this._barSize;
    }


    constructor(args: IViewsConstructorArgs) {
        this._context = args.context;
        this._uiSize = args.uiSize;
        this._barSize = args.barSize;
        this._gridContainer = new GridContainer<ViewType>({
            container: args.ui
        });
        this._barContainer = new BarContainer<ViewType>({
            container: args.bar
        });
        this._views = new Map<ViewType, View>();
        this._views.set(ViewType.Load, new LoadingView<AssetType>({
            loader: args.loader
        }));
        this._views.set(ViewType.Main, new MainMenuView());
        this._views.set(ViewType.Game, new GameView({ size: args.uiSize }));
        this._views.set(ViewType.Pause, new PauseView());
        this._views.set(ViewType.Help, new HelpView());
        this._views.set(ViewType.Success, new SuccessView());
        this._views.set(ViewType.Fail, new FailView());
        this._views.set(ViewType.Settings, new SettingsView());
        this._views.set(ViewType.Diagnostics, new DiagnosticsView());
    }

    /**
     * Destroy all Views
     */
    public destroy(): void {
        this._views.forEach((value, key) => {
            this._gridContainer.deleteGrid(key);
            value.destroy();
        });
    }
    /**
     * Destroy an individual view, removing it from layouts
     */
    public destroyView(key: ViewType): void {
        const view = this._views.get(key);
        if (view != undefined) {
            this._gridContainer.deleteGrid(key);
            view.destroy();
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
        if (this._activeView == key) {
            return;
        }
        const view = this._views.get(key);
        if (view != undefined) {
            if (this._activeView != ViewType.None) {
                this.hideView(this._activeView);
            }
            if (!this._gridContainer.hasGrid(key)) {
                const grid = new Grid({ size: this._uiSize });
                view.populateGrid(grid);
                this._gridContainer.addGrid(key, grid);
            }
            if (!this._barContainer.hasBar(key)) {
                const bar = new Bar({ size: this._barSize });
                view.populateBar(bar);
                this._barContainer.addBar(key, bar);
            }
            this._barContainer.showBar(key);
            this._gridContainer.showGrid(key);
            view.show();
            this._activeView = key;
            view.render(this._context, this._uiSize);
        }
    }

    public getView(key: ViewType): View | undefined {
        return this._views.get(key);
    }

    /**
     * Will hide view specified
     * @param key Views key to hide
     */
    public hideView(key: ViewType): void {
        const view = this._views.get(key);
        if (view != undefined) {
            this._gridContainer.hideGrid(key);
            this._barContainer.hideBar(key);
            view.hide();
            if (key == this._activeView) {
                this._activeView = ViewType.None;
            }
        }
    }
}