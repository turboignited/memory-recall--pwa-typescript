import { View } from "./view";
import { ViewType } from "./view_type";
import { Game } from "../game/game";
import { GameState } from "../game/game_state";
import { Grid } from "../ui/grid";
import { App } from "../app";
import { Button } from "../ui/components";
import { GameLogic } from "../game/game_logic";
import { Sprite } from "../assets/sprite";

/**
 * @implements View
 */
export class GameView extends View {

    private _game: Game;

    constructor(type: ViewType) {
        super(type);
        this._game = new Game({
            logic: new GameLogic({
                callback: (success: boolean, score: number, times: number[]) => {
                    this.onGameCompleted(success, score, times);
                },
                cellSize: App.dimensions.gcd,
                columns: App.dimensions.width / App.dimensions.gcd,
                rows: (App.dimensions.height / App.dimensions.gcd) - 1
            })
        });
    }

    public onGameCompleted(success: boolean, score: number, times: number[]) {
        console.log(`Game Complete: Success: ${success}, Score: ${score}, Times: ${JSON.stringify(times, null, 4)}`);
        this._game.quit();
        App.preferences.increaseScore(App.preferences.activeSprite);
        const sprites: Sprite[] = [];
        const activeSprite = App.preferences.activeSprite;

        for (let i = 0; i < App.preferences.getScore(activeSprite); i++) {
            sprites.push(App.assets.sprites.getRandomSprite(activeSprite));
        }

        this._game.start(sprites);
    }

    public onDestroy(): void {
        this._game.quit();
    }

    public onHide(): void {
        if (this._game.state != GameState.Paused) {
            this._game.quit();
        }
    }

    public onShow(): void {
        if (this._game.state == GameState.Paused) {
            this._game.resume();
        } else {
            const sprites: Sprite[] = [];
            const activeSprite = App.preferences.activeSprite;

            // for (let i = 0; i < App.preferences.getScore(activeSprite); i++) {
            //     sprites.push(App.assets.sprites.getRandomSprite(activeSprite));
            // }
            for (let i = 0; i < 100; i++) {
                sprites.push(App.assets.sprites.getRandomSprite(activeSprite));
            }
            this._game.start(sprites);
        }
    }

    public render(context: CanvasRenderingContext2D): void {
        this._game.render(context);
    }
    public reset(): void {
        if (this._game.state == GameState.Paused) {
            this._game.restart();
        }
    }

    public createCells(grid: Grid): void {
        const pauseButton = Button("||", () => {
            if (this._game.state == GameState.Playing) {
                this._game.pause();
                App.views.setView(ViewType.Pause);
            }
        });

        grid.addCell({
            type: this.type,
            element: pauseButton,
            row: grid.rows,
            column: grid.columns * 0.5,
            columnSpan: 2,
            rowSpan: 1
        });

    }

}