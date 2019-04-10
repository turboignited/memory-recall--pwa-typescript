import { Loader } from "../utils/loader";
import { ViewType } from "./view_type";
import { UI } from "./ui";
import { App } from "../app";

export abstract class View {
    private _type: ViewType;
    private _visible: boolean;
    private _ui: UI;
    public get visible(): boolean {
        return this._visible;
    }
    public get type(): ViewType {
        return this._type;
    }
    public get ui(): UI {
        return this._ui;
    }
    constructor(type: ViewType, app: App) {
        this._type = type;
        this._ui = new UI(this.createUI(app));
        this._visible = false;
    }
    /**
     * Call to load images and other assets for the view
     * @param loader Required to inform about progress
     */
    public load(loader: Loader<ViewType>): void { }
    /**
     * Call to show the HTML contents of this view
     */
    public show(): void {
        this._ui.show();
        this._visible = true;
    }

    /**
     * Call to hide the HTML contents of this view
     */
    public hide(): void {
        this._ui.hide();
        this._visible = false;
    }

    /**
     * 
     * @param app Allows calling methods on app in response to buttons etc.
     */
    public abstract createUI(app: App): HTMLDivElement;

    /**
     * Call to destroy
     */
    public destroy(): void {
        this._visible = false;
    }
    /**
     * Call to render canvas specific contents, can call requestAnimationFrame to repeat drawing.
     * Ensure to check for if this view is showing to prevent rendering when not being shown.
     */
    public render(context: CanvasRenderingContext2D): void { }
}
