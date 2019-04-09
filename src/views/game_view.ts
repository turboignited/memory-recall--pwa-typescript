import { View } from "./view";
import { ViewType } from "./view_type";
import { Loader } from "../utils/loader";
import { App } from "../app";

import { Game } from "../game/game";
import { GameState } from "../game/game_state";

export class GameView extends View {
    private _game!: Game;

    constructor(type: ViewType, app: App) {
        super(type, app);
        this._game = new Game(app.dimensions);
    }

    public load(loader: Loader<ViewType>): void {
        if (loader) {
            this._game.load(loader, this.type);
        }
    }

    public createUI(app: App): HTMLDivElement {
        const container = document.createElement("div");
        const pauseButton = document.createElement("button");
        pauseButton.innerText = "||";
        pauseButton.addEventListener("click", () => {
            if (this._game.state == GameState.Playing) {
                this._game.pause();
                app.setView(ViewType.Pause);
            }
        });
        container.appendChild(pauseButton);
        return container;
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
        context.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        context.fillStyle = "blue";
        context.fillText("Starting", this.dimensions.width * 0.5, this.dimensions.height * 0.5);
        this._game.size = this.dimensions;
        this._game.render(context);
    }
}