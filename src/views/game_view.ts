import { View } from "./view";
import { ViewType } from "./view_type";
import { Game } from "../game/game";
import { GameState } from "../game/game_state";
import { Grid } from "../ui/grid";
import { App } from "../app";
import { Button } from "../ui/components";
import { GameLogic } from "../game/game_logic";
import { Sprite } from "../assets/sprite";
import { Score } from "../storage/preferences";

/**
 * @implements View
 */
export class GameView extends View {

    private _game: Game;

    constructor(type: ViewType) {
        super(type);
        this._game = new Game({
            logic: new GameLogic({
                callback: (success: boolean, score: number, time: number) => {
                    this.onGameCompleted(success, score, time);
                },
                cellSize: App.dimensions.gcd,
                columns: App.dimensions.width / App.dimensions.gcd,
                rows: (App.dimensions.height / App.dimensions.gcd) - 2
            })
        });
    }

    public onGameCompleted(success: boolean, score: number, time: number) {

        console.log(`Game Complete: Success: ${success}, Score: ${score}, Time: ${time}`);
        const newScore: Score = {
            score: score,
            time: time,
            type: App.preferences.activeSprite
        };
        if (success) {
            this._game.quit();
            App.preferences.saveScore(newScore);
            App.views.setView(ViewType.Success);
        } else {
            this._game.pause();
            App.views.setView(ViewType.Fail);
        }
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
            let spriteCount: number;
            const activeSprite = App.preferences.activeSprite;
            const currentScore = App.preferences.getScore(activeSprite);
            if (currentScore != null) {
                spriteCount = currentScore.score + 1;
            } else {
                spriteCount = App.preferences.minimumScore;
            }
            for (let i = 0; i < spriteCount; i++) {
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