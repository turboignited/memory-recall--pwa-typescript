import { Sprite } from "../assets/sprite";

export abstract class Logic {

    public abstract render(context: CanvasRenderingContext2D): void;
    public abstract update(): void;
    public abstract cancel(): void;
    public abstract restart(): void;
    public abstract initialize(sprites: Sprite[]): boolean;
}