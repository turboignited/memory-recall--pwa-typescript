import { View } from "./view";
import { ViewType } from "./view_type";
import { Game } from "../game/game";
import { GameState } from "../game/game_state";
import { GameLogic } from "../game/game_logic";
import { Views } from "./views";
import { Preferences } from "../storage/preferences";
import { Assets } from "../assets/assets";
import { Sprite } from "../assets/sprite";
import { Layout } from "../ui/layout";
import { GridLayout } from "../ui/grid_layout";
import { ButtonComponent } from "../ui/components";
import { Colours } from "../utils/colours";
import { Score } from "../storage/score";

/**
 * @implements View
 */
export class GameView extends View {

    private _game: Game;

    constructor(type: ViewType, views: Views) {
        super(type, views);


        this._game = new Game({
            logic: new GameLogic({
                callback: (success: boolean, score: number, time: number) => {
                    this.onGameCompleted(success, score, time);
                },
                cellSize: 80,
                columns: 9,
                rows: 14
            })
        });

        views.container.setClickHandler((x: number, y: number) => {
            this._game.logic.selectPosition(x, y);
        });

    }

    public onGameCompleted(success: boolean, score: number, time: number) {
        console.log(`Game Complete: Success: ${success}, Score: ${score}, Time: ${time}`);
        const newScore: Score = {
            score: score,
            time: time,
            type: Preferences.activeSprite
        };
        if (success) {
            this._game.quit();
            Preferences.saveScore(newScore);
            View.views.setView(ViewType.Success);
        } else {
            this._game.pause();
            View.views.setView(ViewType.Fail);
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
            const activeSprite = Preferences.activeSprite;
            const currentScore = Preferences.getScore(activeSprite);
            if (currentScore != null) {
                spriteCount = currentScore.score + 1;
            } else {
                spriteCount = Preferences.minimumScore;
            }
            for (let i = 0; i < spriteCount; i++) {
                sprites.push(Assets.sprites.getRandomSprite(activeSprite));
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

    public onPauseButtonClicked(): void {
        if (this._game.state == GameState.Playing) {
            this._game.pause();
            View.views.setView(ViewType.Pause);
        }
    }

    public createLayout(): Layout | void {
        const grid = new GridLayout();

        grid.add({
            element: ButtonComponent("||", Colours.Secondary, () => {
                this.onPauseButtonClicked();
            }),
            column: 5,
            row: 16,
        });

        return grid;

    }

}