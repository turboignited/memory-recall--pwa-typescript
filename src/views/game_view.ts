import { View } from "./view";
import { ViewType } from "./view_type";
import { Loader } from "../utils/loader";
import { App } from "../app";

import { Game } from "../game/game";
import { GameState } from "../game/game_state";
import { Statics } from "../statics";

export class GameView extends View {
    private _game: Game;

    constructor(type: ViewType, app: App) {
        super(type, app);
        this._game = new Game();
    }

    public load(loader: Loader<ViewType>): void {
        if (loader) {
            this._game.load(loader, this.type);
        }
    }

    public destroy(): void {
        super.destroy();
        this._game.quit();
    }

    public hide(): void {
        super.hide();
        if (this._game.state != GameState.Paused) {
            this._game.quit();
        }
    }

    public show(): void {
        super.show();
        if (this._game.state == GameState.Paused) {
            this._game.resume();
        } else {
            this._game.start();
        }
    }

    public render(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, Statics.Dimensions.width, Statics.Dimensions.height);
        context.fillStyle = "blue";
        context.globalAlpha=1;
        context.fillText("Starting", Statics.Dimensions.width * 0.5, Statics.Dimensions.height * 0.5);
        this._game.render(context);
    }
}