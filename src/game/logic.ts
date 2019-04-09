import { Dimensions } from "../utils/dimensions";
import { Sprites } from "./sprites";
import { Loader } from "../utils/loader";
import { ViewType } from "../views/view_type";
import { LogicState } from "./logic_state";
import { Score } from "../storage/score";
import { SpriteTypes } from "../assets/sprite_types";
import { Sprite } from "./sprite";
import { Point } from "../utils/point";

export class GameLogic {
    private _state: LogicState = LogicState.None;
    private _size: Dimensions;
    private _positions: Point[];
    private _score: Score;
    private _renderedGrid: boolean = false;
    private _sprites: Sprites;
    private _activeSprites: Sprite[];
    private _revealInterval: number = 0;
    private _revealing: boolean = false;
    private _changingSpriteIndex: number = 0;
    private _revealed: number = 0;
    private _shouldRender: boolean = true;
    private _shouldUpdate: boolean = true;
    private _spriteType: SpriteTypes = SpriteTypes.numbers;
    public get size(): Dimensions {
        return this._size;
    }

    constructor(size: Dimensions) {
        this._size = size;
        this._sprites = new Sprites(size);
        this._score = new Score(
            2,
            (this._size.width / this._sprites.spriteSize) *
            (this._size.height / this._sprites.spriteSize)
        );
        this._positions = [];
        this._activeSprites = [];
    }

    public load(loader: Loader<ViewType>, type: ViewType): void {
        this._sprites.load(loader, type);

    }

    /**
     * Populate positions array with random Points within the grid.
     * Creating the array with the length of the current score is relevant
     * aswell as providing security in terms of amount of available positions
     */
    public generatePositions(): void {
        let availablePositions = [];
        const spriteSize = this._sprites.spriteSize;
        for (let x = 0; x < this._size.width / this._sprites.spriteSize; x++) {
            for (let y = 0; y < this._size.height / this._sprites.spriteSize; y++) {
                availablePositions.push(new Point(x * spriteSize, y * spriteSize));
            }
        }

        // Shuffle availabe Positions
        for (let i = availablePositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availablePositions[i], availablePositions[j]] =
                [availablePositions[j], availablePositions[i]];
        }
        // Populate positions 
        for (let i = 0; i < this._score.maximum; i++) {
            this._positions[i] = availablePositions[i];
        }
    }

    public setup(): void {
        if (this._state == LogicState.None) {
            this.generatePositions();
            for (let i = 0; i < this._positions.length; i++) {
                const sprite = this._sprites.getRandomSprite(this._spriteType);
                sprite.position = this._positions[i];
                this._activeSprites[i] = sprite;
            }
            this._revealed = 0;
            this._state = LogicState.Reveal;
        }
    }

    public update(): void {
        if (this._shouldUpdate) {
            switch (this._state) {
                case LogicState.None:
                    break;
                case LogicState.Reveal:
                    if (!this._revealing) {
                        if (this._revealed == this._positions.length) {
                            console.log("HI")
                            this._state = LogicState.Select;
                        } else {
                            this.fadeInNextSprite();
                        }
                    }
                    break;
                case LogicState.Select:

                    break;
                case LogicState.Fail:
                    break;
                case LogicState.Finish:
                    break;
                default:
                    break;
            }
            this._shouldUpdate = false;
        }
    }

    public render(context: CanvasRenderingContext2D): void {
        if (this._shouldRender) {
            if (!this._renderedGrid) {
                this.renderGrid(context);
            }
            switch (this._state) {
                case LogicState.None:
                    break;
                case LogicState.Reveal:
                    const sprite = this._activeSprites[this._changingSpriteIndex];
                    context.globalAlpha = sprite.alpha;
                    context.drawImage(sprite.image, sprite.position.x, sprite.position.y);
                    break;
                case LogicState.Select:

                    break;
                case LogicState.Fail:
                    break;
                case LogicState.Finish:
                    break;
                default:
                    break;
            }
            this._shouldRender = false;
        }

    }

    public fadeInNextSprite() {
        this._revealing = true;
        const sprite = this._activeSprites[this._revealed];
        this._changingSpriteIndex = this._revealed;
        let alpha = 0.0;
        const reveal: TimerHandler = () => {
            alpha += 0.1;
            sprite.alpha = alpha;
            this._shouldRender = true;
            if (alpha >= 1) {
                sprite.alpha = 1;
                this._revealing = false;
                this._revealed++;
                this._shouldUpdate = true;
                clearInterval(this._revealInterval);
            }
        }
        this._revealInterval = setInterval(reveal, 10);


    }

    public renderGrid(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, this._size.width, this._size.height);
        context.strokeStyle = "black";
        const cellSize = this._sprites.spriteSize;
        for (let x = 0; x < this._size.width / cellSize; x++) {
            for (let y = 0; y < this._size.height / cellSize; y++) {
                context.strokeRect(
                    x * cellSize,
                    y * cellSize,
                    cellSize,
                    cellSize);
            }

        }
        this._renderedGrid = true;
    }

}