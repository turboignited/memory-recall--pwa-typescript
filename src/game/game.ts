import { GameState } from "./game_state";
import { GameLogic } from "./game_logic";
export interface IGameConstructorArgs {
    logic: GameLogic;
}
export class Game {
    private _state: GameState;
    private _animationFrame: number;
    private _logic: GameLogic;

    public get logic(): GameLogic {
        return this._logic;
    }

    public get state(): GameState {
        return this._state;
    }

    public get animationFrame(): number {
        return this._animationFrame;
    }

    constructor(args: IGameConstructorArgs) {
        this._state = GameState.None;
        this._animationFrame = 0;
        this._logic = args.logic;
    }

    public render(context: CanvasRenderingContext2D): void {
        if (this._state == GameState.Playing) {
            this._logic.update();
            this._logic.render(context);
            this._animationFrame = requestAnimationFrame(() => {
                this.render(context);
            });
        }
    }

    public start(): boolean {
        if (this._state != GameState.None) {
            return false;
        }
        this._logic.initialize();
        this._state = GameState.Playing;
        return true;
    }

    public pause(): boolean {
        if (this._state == GameState.Playing) {
            this._state = GameState.Paused;
            cancelAnimationFrame(this._animationFrame);
            return true;
        }
        return false;
    }

    public resume(): boolean {
        if (this._state == GameState.Paused) {
            this._state = GameState.Playing;
            return true;
        }
        return false;
    }

    public restart(): boolean {
        if (this._state == GameState.Paused) {
            cancelAnimationFrame(this._animationFrame);
            this._animationFrame = 0;
            this._logic.reset();
            this._state = GameState.Playing;
            return true;
        }
        return false;
    }

    public quit(): boolean {
        this._state = GameState.None;
        cancelAnimationFrame(this._animationFrame);
        this._animationFrame = 0;
        this._logic.quit();
        return true;
    }
}