import { ViewType } from "./view_type";
import { Views } from "./views";
import { Container } from "../ui/container";
import { Layout } from "../ui/layout";

export abstract class View {
    private _type: ViewType;
    private _visible: boolean;
    private static _views: Views;

    public static get views(): Views {
        return this._views;
    }
    public get visible(): boolean {
        return this._visible;
    }
    public get type(): ViewType {
        return this._type;
    }

    constructor(type: ViewType, views: Views) {
        View._views = views;
        this._type = type;
        this._visible = false;
    }

    public show(container: Container<ViewType>): void {
        if (this._visible) {
            return;
        }
        if (!container.layoutExists(this.type)) {
            const layout = this.createLayout();
            if (layout != undefined) {
                container.addLayout(this.type, layout);
            }
        }
        container.showLayout(this.type);
        this._visible = true;
        this.onShow();
    }

    public hide(container: Container<ViewType>): void {
        if (!this._visible) {
            return;
        }
        container.hideLayout(this.type);
        this._visible = false;
        this.onHide();
    }

    public destroy(container: Container<ViewType>): void {
        container.deleteLayout(this.type);
        this._visible = false;
        this.onDestroy();
    }
    public abstract createLayout(): Layout | void;
    public abstract reset(): void;
    public abstract render(context: CanvasRenderingContext2D): void;
    public abstract onShow(): void;
    public abstract onHide(): void;
    public abstract onDestroy(): void;
}
