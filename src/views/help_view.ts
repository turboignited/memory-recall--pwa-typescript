import { View } from "./view";
import { App } from "../app";

/**
 * @implements View
 */
export class HelpView extends View {
    public reset(): void { }

    public render(context: CanvasRenderingContext2D): void {
        context.textAlign = "center";
        context.fillStyle = "red";
        context.fillText("Hello", App.dimensions.width * 0.5, App.dimensions.height * 0.5);

    }
    public createCells(grid: import("../ui/grid").Grid): void {

    }
    public onShow(): void {

    }
    public onHide(): void {

    }
    public onDestroy(): void {

    }
}