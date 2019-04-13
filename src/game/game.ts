import { GameState } from "./game_state";
import { Logic } from "./logic";
import { Sprite } from "../assets/sprite";
export interface GameConstructorArgs {
    logic: Logic;
}
export declare type CountdownCallback = (seconds: number) => void;
export class Game {
    private _state: GameState;
    private _countdownInterval: number;
    private _animationFrame: number;
    private _logic: Logic;

    public get logic(): Logic {
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


    constructor(args: GameConstructorArgs) {
        this._state = GameState.None;
        this._countdownInterval = 0;
        this._animationFrame = 0;
        this._logic = args.logic;
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
                context.globalAlpha = 1.0;
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                context.fillStyle = "black";

                context.fillText(seconds.toString(), context.canvas.width * 0.5, context.canvas.height * 0.5);
                if (seconds == 0) {
                    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                    context.globalAlpha = 1;
                    context.fillText("Starting", context.canvas.width * 0.5, context.canvas.height * 0.5);

                    this.render(context);

                }
            });
        }
    }

    public start(sprites: Sprite[]): boolean {
        if (this._state != GameState.None) {
            return false;
        }
        this._logic.initialize(sprites);
        this._state = GameState.Countdown;
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

    public restart(): boolean {
        if (this._state == GameState.Paused) {
            clearInterval(this._countdownInterval);
            cancelAnimationFrame(this._animationFrame);
            this._countdownInterval = 0;
            this._animationFrame = 0;
            this._logic.restart();
            this._state = GameState.Countdown;
            return true;
        }
        return false;
    }

    public quit(): boolean {
        this._state = GameState.None;
        clearInterval(this._countdownInterval);
        cancelAnimationFrame(this._animationFrame);
        this._countdownInterval = 0;
        this._animationFrame = 0;
        this._logic.cancel();
        return true;
    }
}