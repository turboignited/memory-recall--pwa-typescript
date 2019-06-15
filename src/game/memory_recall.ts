import { MemoryRecallState } from "./memory_recall_state";
import { Sprite } from "../assets/sprite";
import { Point } from "../utils/point";
import { Rendering } from "../render/rendering";
import { Colours } from "../utils/colours";
import { GameLogic } from "./game_logic";
import { Assets } from "../assets/assets";
import { Preferences } from "../storage/preferences";
import { Scores, IScore } from "../storage/scores";
import { Size } from "../utils/size";

export interface IMemoryRecallConstructor {
    size: Size;
    callback?: GameLogicCompletedCallback;
}
export interface IGameLogicCompletedCallbackArgs {
    success: boolean;
    score: IScore;
}
export declare type GameLogicCompletedCallback = (args: IGameLogicCompletedCallbackArgs) => void;
/**
 * @implements GameLogic
 */
export class MemoryRecall extends GameLogic {
    private _state: MemoryRecallState;
    public get state(): MemoryRecallState {
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
    private _spriteIndexes: Point[];
    public get spriteIndexes(): Point[] {
        return this._spriteIndexes;
    }
    private _sprites: Sprite[][];
    public get sprites(): Sprite[][] {
        return this._sprites;
    }
    private _spritesLength: number;
    public get spritesLength(): number {
        return this._spritesLength;
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
    private _selectedPosition: Point | undefined;
    public get selected(): Point | undefined {
        return this._selectedPosition;
    }
    private _startedClickTime: number;
    public get startedClickTime(): number {
        return this._startedClickTime;
    }
    private _callback: GameLogicCompletedCallback | undefined;
    public get callback(): GameLogicCompletedCallback | undefined {
        return this._callback;
    }
    private _clicked: number;
    public get correct(): number {
        return this._clicked;
    }
    public get available2DIndexes(): Point[] {
        const indexes: Point[] = [];
        for (let x = 0; x < this._columns; x++) {
            for (let y = 1; y < this._rows + 1; y++) {
                indexes.push(new Point({ x: x, y: y }));
            }
        }
        return indexes;
    }

    constructor(args: IMemoryRecallConstructor) {
        super();
        this._cellSize = args.size.gcd;
        this._columns = args.size.width / args.size.gcd;
        this._rows = (args.size.height - (args.size.gcd)) / args.size.gcd;
        if (args.callback != undefined) {
            this._callback = args.callback;
        }
        this._state = MemoryRecallState.None;
        this._sprites = [];
        this._spriteIndexes = [];
        this._shouldRender = false;
        this._shouldUpdate = false;
        this._revealed = 0;
        this._revealing = false;
        this._revealInterval = 0;
        this._clicked = 0;
        this._spritesLength = 0;
        this._startedClickTime = 0;
    }

    public initialize(): boolean {
        const score = Scores.getScore(Preferences.activeSprite);
        if (score.score > this._columns * this._rows) {
            score.score = this._columns * this._rows;
        } else {
            score.score += 1;
        }

        const indexes = this.available2DIndexes;

        this.shuffleArray(indexes);
        this._sprites.splice(0, this._sprites.length);
        this._spriteIndexes.splice(0, this._spriteIndexes.length);
        this._sprites = [];
        this._spriteIndexes = [];
        for (let i = 0; i < score.score; i++) {
            const position = indexes[i];
            const sprite = Assets.sprites.getRandomSprite(score.type);
            if (this._sprites[position.y] == undefined) {
                this._sprites[position.y] = [];
            }
            this._sprites[position.y][position.x] = sprite;

            this._spriteIndexes.push(position);
        }

        clearInterval(this._revealInterval);
        this._startedClickTime = 0;
        this._selectedPosition = undefined;
        this._revealing = false;
        this._revealed = 0;
        this._clicked = 0;
        this._spritesLength = this._spriteIndexes.length;
        this._shouldRender = true;
        this._state = MemoryRecallState.None;
        return true;
    }

    public quit(): void {
        clearInterval(this._revealInterval);
        this._selectedPosition = undefined;
        this._revealing = false;
        this._shouldRender = false;
        this._shouldUpdate = false;
    }

    public reset(): void {
        clearInterval(this._revealInterval);
        this._startedClickTime = 0;
        this._selectedPosition = undefined;
        this._revealing = false;
        this._revealed = 0;
        this._clicked = 0;
        this._shouldRender = true;
        this._state = MemoryRecallState.None;
    }

    public selectPosition(position: Point): void {
        if (this._state == MemoryRecallState.Select) {
            position.x = Math.floor(position.x / this._cellSize % this._columns);
            position.y = Math.floor(position.y / this._cellSize % this._rows + 1);
            this.onPositionSelected(position);
        }
    }

    public onPositionSelected(position: Point): void {
        if (this._sprites[position.y] != undefined) {
            const sprite = this._sprites[position.y][position.x];
            if (sprite != undefined) {
                if (sprite != null) {
                    this._selectedPosition = position;
                    this._shouldRender = true;
                }
            }
        }
    }

    public verifySelection(position: Point): boolean {
        const index = this._spriteIndexes[this._clicked];
        return index.x == position.x && index.y == position.y;
    }

    public update(): void {
        if (this._shouldUpdate) {
            switch (this._state) {
                case MemoryRecallState.None:
                    break;
                case MemoryRecallState.Reveal:
                    this.updateRevealState();
                    break;
                case MemoryRecallState.Select:
                    this.updateSelectState();
                    break;
                case MemoryRecallState.Fail:
                    this.updateFailState();
                    break;
                case MemoryRecallState.Success:
                    this.updateSuccessState();
                    break;
                default:
                    break;
            }
            this._shouldUpdate = false;
        }
    }

    public render(context: CanvasRenderingContext2D): void {
        if (this._shouldRender) {
            switch (this._state) {
                case MemoryRecallState.None:
                    this.renderNoneState(context);
                    break;
                case MemoryRecallState.Reveal:
                    this.renderRevealState(context);
                    break;
                case MemoryRecallState.Select:
                    this.renderSelectState(context);
                    break;
                default:
                    break;
            }
            this._shouldRender = false;
        }
    }

    public shuffleArray(arr: any[]): void {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] =
                [arr[j], arr[i]];
        }
    }

    public updateRevealState(): void {
        if (!this._revealing) {

            if (this._revealed == this._spritesLength) {
                this._state = MemoryRecallState.Select;
                this._shouldUpdate = true;
                this._shouldRender = true;
            } else {
                this.revealNextSprite();
            }
        }
    }

    public updateSelectState(): void {
        if (this._clicked == this._revealed) {
            this._state = MemoryRecallState.Success;
            this._shouldUpdate = true;
            this._shouldRender = true;
        }
    }

    public updateFailState(): void {
        if (this._state == MemoryRecallState.Fail) {
            if (this._callback != undefined) {
                this._callback({
                    success: false,
                    score: {
                        score: this._sprites.length,
                        time: Date.now() - this._startedClickTime,
                        type: Preferences.activeSprite
                    }
                });
            }
            this._shouldRender = true;
        }
    }

    public updateSuccessState(): void {
        if (this._state == MemoryRecallState.Success) {
            if (this._callback != undefined) {
                this._callback({
                    success: true,
                    score: {
                        score: this._spritesLength,
                        time: Date.now() - this._startedClickTime,
                        type: Preferences.activeSprite
                    }
                });
            }
            this._shouldRender = true;
        }
    }

    public renderNoneState(context: CanvasRenderingContext2D): void {
        context.globalAlpha = 1.0;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        Rendering.renderGrid({
            context: context,
            cellSize: this._cellSize,
            columns: this._columns,
            rows: this._rows + 1,
            rowOffset: 1,
            strokeColour: Colours.Black,
            strokeWidth: 1.5
        });
        this._state = MemoryRecallState.Reveal;
        this._shouldUpdate = true;
    }

    public renderSelectState(context: CanvasRenderingContext2D): void {

        if (this._selectedPosition != undefined) {

            if (this.verifySelection(this._selectedPosition)) {
                Rendering.renderTickAt({
                    context: context,
                    position: {
                        x: this._selectedPosition.x * this._cellSize,
                        y: this._selectedPosition.y * this._cellSize
                    },
                    size: this._cellSize,
                    strokeColour: Colours.Green,
                    strokeWidth: 6
                });
                this._clicked++;

                if (this._clicked > 1) {
                    Rendering.renderLine({
                        context: context,
                        from: {
                            x: this._spriteIndexes[this._clicked - 2].x * this._cellSize,
                            y: this._spriteIndexes[this._clicked - 2].y * this._cellSize
                        },
                        to: {
                            x: this._spriteIndexes[this._clicked - 1].x * this._cellSize,
                            y: this._spriteIndexes[this._clicked - 1].y * this._cellSize
                        },
                        offset: this._cellSize * 0.5,
                        strokeColour: Colours.Green,
                        strokeWidth: 6
                    });
                } else {
                    this._startedClickTime = Date.now();
                }
                if (this._clicked == this._spritesLength) {
                    this._state = MemoryRecallState.Success;
                }
                this._shouldUpdate = true;
            } else {
                Rendering.renderCrossAt({
                    context: context,
                    position: {
                        x: this._selectedPosition.x * this._cellSize,
                        y: this._selectedPosition.y * this._cellSize
                    },
                    size: this._cellSize,
                    strokeColour: Colours.Red,
                    strokeWidth: 6
                });
                this._state = MemoryRecallState.Fail;
                this._shouldUpdate = true;
            }
            this._selectedPosition = undefined;
        }

    }



    public renderRevealState(context: CanvasRenderingContext2D): void {
        const index = this._spriteIndexes[this._revealed];
        const sprite = this._sprites[index.y][index.x];
        if (sprite.alpha == 1) {
            this._revealed++;
            // context.fillStyle = Colours.Secondary;
            // context.font = `${this._cellSize * 0.5} serif`;
            // context.textAlign = "center";
            // context.clearRect(0, 0, (this._columns * this._cellSize), this._cellSize);
            // context.fillText(
            //     `${this._activeIndex}/${this._activeSprites.length}`,
            //     this._columns * this._cellSize * 0.5,
            //     this._cellSize * 0.75,
            //     this._columns * this._cellSize
            // );
            this._shouldUpdate = true;
        }
        context.globalAlpha = sprite.alpha;
        context.drawImage(sprite.image, index.x * this._cellSize, index.y * this._cellSize, this._cellSize, this._cellSize);
    }

    public revealNextSprite(): void {
        this._revealing = true;
        const index = this._spriteIndexes[this._revealed];
        const sprite = this._sprites[index.y][index.x];
        let alpha = 0.0;
        const reveal: TimerHandler = () => {
            alpha += 0.1;
            if (alpha >= 1) {
                sprite.alpha = 1;
                this._revealing = false;
                clearInterval(this._revealInterval);
            } else {
                sprite.alpha = alpha;
            }
            this._shouldRender = true;
        }
        this._revealInterval = setInterval(reveal, this._revealSpeed);
    }

}