import { Dimensions } from "../utils/dimensions";
import { Loader } from "../utils/loader";
import { ViewType } from "../views/view_type";
import { GameState } from "./game_state";
import { GameLogic } from "./logic";

export declare type CountdownCallback = (seconds: number) => void;
export class Game {
    private _state: GameState = GameState.None;;
    private _countdownInterval: number = 0;
    private _animationFrame: number = 0;
    private _logic: GameLogic;
    private _size: Dimensions;

    public get size(): Dimensions {
        return this._size;
    }

    public set size(value: Dimensions) {
        this._size = value;
    }

    public get logic(): GameLogic {
        return this._logic;
    }

    public get state(): GameState {
        return this._state;
    }

    public get countdownInterval(): number {
        return this._countdownInterval;
    }

    public get animationFrame(): number {
        return this._animationFrame;
    }

    constructor(size: Dimensions) {
        this._size = size;
        this._logic = new GameLogic(size);
    }

    public load(loader: Loader<ViewType>, type: ViewType): void {
        this._logic.load(loader, type);
    }

    public render(context: CanvasRenderingContext2D): void {
        if (this._state == GameState.Playing) {
            this._logic.update();
            this._logic.render(context);
            this._animationFrame = requestAnimationFrame((time: number) => {

                this.render(context);
            });
        } else if (this._state == GameState.Countdown) {
            this.countdown(3, (seconds: number) => {
                context.clearRect(0, 0, this._size.width, this._size.height);
                context.fillStyle = "black";
                context.fillText(seconds.toString(), this._size.width * 0.5, this._size.height * 0.5);
                if (seconds == 0) {
                    this.render(context);
                }
            });
        }
    }

    public start(): boolean {
        if (this._state != GameState.None) {
            return false;
        }
        this._state = GameState.Countdown;
        this._logic.setup();
        return true;
    }

    public countdown(seconds: number, callback: CountdownCallback): boolean {
        if (this._state == GameState.Countdown && this._countdownInterval == 0) {
            const handler: TimerHandler = () => {
                seconds--;
                if (seconds == 0) {
                    clearInterval(this._countdownInterval);
                    this._countdownInterval = 0;
                    this._state = GameState.Playing;
                }
                callback(seconds);
            }
            this._countdownInterval = setInterval(handler, 1000);
            return true;
        }
        return false;
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

    public quit(): boolean {
        this._state = GameState.None;
        clearInterval(this._countdownInterval);
        cancelAnimationFrame(this._animationFrame);
        return true;
    }
}