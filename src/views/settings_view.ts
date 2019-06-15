import { View } from "./view";
import { Grid } from "../ui/grid";
import { Bar } from "../ui/bar";
import { Size } from "../utils/size";

/**
 * @implements View
 */
export class SettingsView extends View {
    public reset(): void { }

    public render(context: CanvasRenderingContext2D, size: Size): void {
    }

    public populateBar(bar: Bar): void { }

    public populateGrid(grid: Grid): void {

    }
    public show(): void {

    }
    public hide(): void {

    }
    public destroy(): void {

    }
}