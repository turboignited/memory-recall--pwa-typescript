import { GameLogicState } from "./game_logic_state";
import { Sprite } from "../assets/sprite";
import { Point } from "../utils/point";
import { Logic } from "./logic";
import { Rendering } from "../render/rendering";

export interface GameLogicConstructor {
    columns: number;
    rows: number;
    cellSize: number;
    callback?: GameLogicCompletedCallback;
}
export declare type GameLogicCompletedCallback = (success: boolean, score: number, time: number) => void;
/**
 * @implements Logic
 */
export class GameLogic implements Logic {
    private _state: GameLogicState;
    public get state(): GameLogicState {
        return this._state;
    }
    private _columns: number;
    public get columns(): number {
        return this._columns;
    }
    private _rows: number;
    public get rows(): number {
        return this._rows;
    }
    private _cellSize: number;
    public get cellSize(): number {
        return this._cellSize;
    }
    private _activeSprites: Sprite[];
    public get activeSprites(): Sprite[] {
        return this._activeSprites;
    }
    private _revealInterval: number;
    public get revealInterval(): number {
        return this._revealInterval;
    }
    private _revealing: boolean;
    public get revealing(): boolean {
        return this._revealing;
    }
    private _revealed: number;
    public get revealed(): number {
        return this._revealed;
    }
    private readonly _revealSpeed: number = 100;
    public get revealSpeed(): number {
        return this._revealInterval;
    }
    private _shouldRender: boolean;
    public get shouldRender(): boolean {
        return this._shouldRender;
    }
    private _shouldUpdate: boolean;
    public get shouldUpdate(): boolean {
        return this._shouldUpdate;
    }
    private _selected: Point | undefined;
    public get selected(): Point | undefined {
        return this._selected;
    }
    private _listening: boolean;
    public get listening(): boolean {
        return this._listening;
    }
    private _startTime: number;
    public get startTime(): number {
        return this._startTime;
    }
    private _callback: GameLogicCompletedCallback | undefined;
    public get callback(): GameLogicCompletedCallback | undefined {
        return this._callback;
    }
    private _correct: number;
    public get correct(): number {
        return this._correct;
    }
    public get availablePositions(): Point[] {
        const available: Point[] = [];
        for (let x = 0; x < this._columns; x++) {
            for (let y = 1; y < this._rows + 1; y++) {
                available.push(new Point(x * this._cellSize, y * this._cellSize));
            }
        }
        return available;
    }

    constructor(args: GameLogicConstructor) {
        this._columns = args.columns;
        this._cellSize = args.cellSize;
        this._rows = args.rows;
        if (args.callback != undefined) {
            this._callback = args.callback;
        }
        this._state = GameLogicState.None;
        this._activeSprites = [];
        this._listening = false;
        this._shouldRender = false;
        this._shouldUpdate = false;
        this._revealed = 0;
        this._revealing = false;
        this._revealInterval = 0;
        this._correct = 0;
        this._startTime = 0;
    }
    public shuffleArray(arr: any[]): void {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] =
                [arr[j], arr[i]];
        }
    }


    public initialize(sprites: Sprite[]): boolean {
        if (sprites.length <= this._columns * this._rows) {
            const availablePositions = this.availablePositions;
            this.shuffleArray(availablePositions);
            this._activeSprites.splice(0, this._activeSprites.length);
            for (let i = 0; i < sprites.length; i++) {
                this._activeSprites[i] = sprites[i];
                this._activeSprites[i].position = availablePositions[i];
            }
            clearInterval(this._revealInterval);
            this._startTime = 0;
            this._selected = undefined;
            this._revealing = false;
            this._revealed = 0;
            this._correct = 0;
            this._shouldRender = true;
            this._state = GameLogicState.None;
            return true;
        }
        return false;
    }

    public cancel(): void {
        clearInterval(this._revealInterval);
        this._selected = undefined;
        this._revealing = false;
        this._shouldRender = false;
        this._shouldUpdate = false;
    }

    public restart(): void {
        clearInterval(this._revealInterval);
        this._startTime = 0;
        this._selected = undefined;
        this._revealing = false;
        this._revealed = 0;
        this._correct = 0;
        this._shouldRender = true;
        this._state = GameLogicState.None;
    }

    /**
     * 0 None,
     * 1 Reveal,
     * 2 Select,
     * 3 Fail,
     * 4 Success
     */
    public update(): void {
        if (this._shouldUpdate) {
            switch (this._state) {
                case GameLogicState.None:
                    break;
                case GameLogicState.Reveal:
                    this.updateRevealState();
                    break;
                case GameLogicState.Select:
                    this.updateSelectState();
                    break;
                case GameLogicState.Fail:
                    this.updateFailState();
                    break;
                case GameLogicState.Success:
                    this.updateSuccessState();
                    break;
                default:
                    break;
            }
            this._shouldUpdate = false;
        }
    }

    /**
     * 0 None,
     * 1 Reveal,
     * 2 Select,
     * 3 Fail,
     * 4 Success
     */
    public render(context: CanvasRenderingContext2D): void {
        if (this._shouldRender) {
            switch (this._state) {
                case GameLogicState.None:
                    this.renderNoneState(context);
                    break;
                case GameLogicState.Reveal:
                    this.renderRevealState(context);
                    break;
                case GameLogicState.Select:
                    this.renderSelectState(context);
                    break;
                default:
                    break;
            }
            this._shouldRender = false;
        }
    }


    /**
     * 
     * Update Functions
     * 
     */
    /**
     * 0 None,
     * 1 Reveal,
     * 2 Select,
     * 3 Fail,
     * 4 Success
     */

    public updateRevealState(): void {
        if (!this._revealing) {
            if (this._revealed == this._activeSprites.length) {
                this._state = GameLogicState.Select;
                this._shouldUpdate = true;
                this._shouldRender = true;
            } else {
                this.revealNextSprite();
            }
        }
    }

    public updateSelectState(): void {
        if (this._correct == this._revealed) {
            this._state = GameLogicState.Success;
            this._shouldUpdate = true;
            this._shouldRender = true;
        }
    }

    public updateFailState(): void {
        if (this._state == GameLogicState.Fail) {
            if (this._callback != undefined) {
                this._callback(false, this._activeSprites.length, Date.now() - this._startTime);
            }
            this._shouldRender = true;
        }
    }

    public updateSuccessState(): void {
        if (this._state == GameLogicState.Success) {
            if (this._callback != undefined) {
                this._callback(true, this._activeSprites.length, Date.now() - this._startTime);
            }
            this._shouldRender = true;
        }
    }

    public setCanvasClickListener(canvas: HTMLCanvasElement): void {
        canvas.addEventListener("click", (ev: MouseEvent) => {

            this.onCanvasClicked(ev);
        }, false);
        this._listening = true;
    }

    /**
     * 
     * Render Functions
     */

    /**
     * 0 None,
     * 1 Reveal,
     * 2 Select,
     * 3 Fail,
     * 4 Success
     */
    public renderNoneState(context: CanvasRenderingContext2D): void {
        context.globalAlpha = 1.0;

        context.clearRect(0, 0, this._cellSize * this._columns, this._cellSize * this._rows);
        Rendering.renderGrid({
            context: context,
            cellSize: this._cellSize,
            columns: this._columns,
            rows: this._rows + 1,
            rowOffset: 1,
            strokeColour: "black",
            strokeWidth: 1.5
        });
        this._state = GameLogicState.Reveal;
        this._shouldUpdate = true;
    }

    public renderSelectState(context: CanvasRenderingContext2D): void {
        if (!this._listening) {
            this.setCanvasClickListener(context.canvas);
        } else {
            if (this._selected != undefined) {

                if (this.verifySelection(this._selected)) {
                    Rendering.renderTickAt({
                        context: context,
                        position: this._selected,
                        size: this._cellSize,
                        strokeColour: "green",
                        strokeWidth: 6
                    });



                    this._correct++;

                    if (this._correct > 1) {
                        Rendering.renderLine({
                            context: context,
                            from: this._activeSprites[this._correct - 2].position,
                            to: this._activeSprites[this._correct - 1].position,
                            offset: this._cellSize * 0.5,
                            strokeColour: "green",
                            strokeWidth: 6
                        });
                    } else {
                        this._startTime = Date.now();
                    }
                    if (this._correct == this._activeSprites.length) {
                        this._state = GameLogicState.Success;
                    }
                    this._shouldUpdate = true;
                } else {
                    Rendering.renderCrossAt({
                        context: context,
                        position: this._selected,
                        size: this._cellSize,
                        strokeColour: "red",
                        strokeWidth: 6
                    });
                    this._state = GameLogicState.Fail;
                    this._shouldUpdate = true;
                }
                this._selected = undefined;
            }
        }
    }

    public onPositionSelected(position: Point): void {


        if (this.spriteExistsAt(position)) {

            this._selected = position;
            this._shouldRender = true;
        } else {

        }
    }

    public verifySelection(position: Point): boolean {
        if (this.getSpriteIndexAt(position) == this._correct) {
            return true;
        }
        return false;
    }

    public renderRevealState(context: CanvasRenderingContext2D): void {
        const sprite = this._activeSprites[this._revealed];
        if (sprite.alpha == 1) {
            this._revealed++;
            context.fillStyle = "black";
            context.font = `${this._cellSize * 0.5} serif`;
            context.textAlign = "center";
            context.clearRect(0, 0, (this._columns * this._cellSize), this._cellSize);
            context.fillText(
                `${this._revealed}/${this._activeSprites.length}`,
                this._columns * this._cellSize * 0.5,
                this._cellSize * 0.75,
                this._columns * this._cellSize
            );
            this._shouldUpdate = true;
            this._shouldRender = true;
        }
        context.globalAlpha = sprite.alpha;
        context.drawImage(sprite.image, sprite.position.x, sprite.position.y, this._cellSize, this._cellSize);
    }

    public getSpriteIndexAt(position: Point): number {
        for (let i = 0; i < this._activeSprites.length; i++) {
            const spritePosition = this._activeSprites[i].position;
            if (spritePosition.x == position.x && spritePosition.y == position.y) {
                return i;
            }
        }
        return -1;
    }

    public spriteExistsAt(position: Point): boolean {
        for (let i = 0; i < this._activeSprites.length; i++) {
            const spritePosition = this._activeSprites[i].position;
            if (spritePosition.x == position.x && spritePosition.y == position.y) {
                return true;
            }
        }
        return false;
    }

    public onCanvasClicked(ev: MouseEvent): void {

        if (this._state == GameLogicState.Select) {

            const column = Math.floor(ev.offsetX / this._cellSize % this._columns);
            const row = Math.floor(ev.offsetY / this._cellSize % (this._rows + 1));
            const position = new Point(column * this._cellSize, row * this._cellSize);




            this.onPositionSelected(position);
        }
    }

    public revealNextSprite(): void {
        this._revealing = true;
        const sprite = this._activeSprites[this._revealed];
        let alpha = 0.0;
        const reveal: TimerHandler = () => {
            alpha += 0.1;
            sprite.alpha = alpha;
            this._shouldRender = true;
            if (alpha >= 1) {
                sprite.alpha = 1;
                this._revealing = false;
                clearInterval(this._revealInterval);
            }
        }
        this._revealInterval = setInterval(reveal, this._revealSpeed);
    }

}