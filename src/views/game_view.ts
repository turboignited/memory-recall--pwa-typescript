import { View } from "./view";
import { ViewType } from "./view_type";
import { Game } from "../game/game";
import { GameState } from "../game/game_state";
import { MemoryRecall, IGameLogicCompletedCallbackArgs } from "../game/memory_recall";
import { ButtonComponent, ParagraphComponent, ImageComponent, ButtonImageComponent } from "../ui/components";
import { Colours } from "../utils/colours";
import { App } from "../app";
import { Scores, IScore } from "../storage/scores";
import { Grid } from "../ui/grid";
import { Bar } from "../ui/bar";
import { Size } from "../utils/size";
import { Point } from "../utils/point";

export interface IGameViewConstructorArgs {
    size: Size
}

/**
 * @implements View
 */
export class GameView extends View {

    private _game: Game;

    constructor(args: IGameViewConstructorArgs) {
        super();
        this._game = new Game({
            logic: new MemoryRecall({
                callback: (args: IGameLogicCompletedCallbackArgs) => {
                    this.onGameCompleted(args.success, args.score);
                },
                size: args.size
            })
        });
    }

    public onGameCompleted(success: boolean, score: IScore) {
        if (success) {
            this._game.quit();
            Scores.saveScore(score);
            App.views.setView(ViewType.Success);
        } else {
            this._game.pause();
            App.views.setView(ViewType.Fail);
        }
    }

    public destroy(): void {
        this._game.quit();
    }

    public hide(): void {
        if (this._game.state != GameState.Paused) {
            this._game.quit();
        }
    }

    public show(): void {
        if (this._game.state == GameState.Paused) {
            this._game.resume();
        } else {
            this._game.start();
            App.views.gridContainer.setClickHandler((x: number, y: number) => {
                this._game.logic.selectPosition({ x: x, y: y });
            });
        }
    }

    public render(context: CanvasRenderingContext2D, size: Size): void {
        this._game.render(context);
    }

    public reset(): void {
        if (this._game.state == GameState.Paused) {
            this._game.restart();
        }
    }

    public onPauseButtonClicked(): void {
        if (this._game.state == GameState.Playing) {
            this._game.pause();
            App.views.setView(ViewType.Pause);
        }
    }
    public populateBar(bar: Bar): void {
        bar.addCell({
            element: ButtonImageComponent({
                image: ImageComponent({
                    alt: "Pause",
                    src: "images/pause.png"
                }),
                onClick: () => {
                    this.onPauseButtonClicked();
                }
            }),
            column: 5
        });
    }

    public populateGrid(grid: Grid): void {


    }

}