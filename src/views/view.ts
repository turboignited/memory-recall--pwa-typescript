import { Size } from "../utils/size";
import { Grid } from "../ui/grid";
import { Bar } from "../ui/bar";

export abstract class View {
    public abstract populateGrid(grid: Grid): void;
    public abstract populateBar(bar: Bar): void;
    public abstract reset(): void;
    public abstract render(context: CanvasRenderingContext2D, size: Size): void;
    public abstract show(): void;
    public abstract hide(): void;
    public abstract destroy(): void;
}