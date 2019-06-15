import { Point } from "../utils/point";

export abstract class GameLogic {
    public abstract initialize(): void;
    public abstract render(context: CanvasRenderingContext2D): void;
    public abstract update(): void;
    public abstract reset(): void;
    public abstract quit(): void;
    public abstract selectPosition(position: Point): void;
}