import { View } from "./view";
import { Grid } from "../ui/grid";
import { Colours } from "../utils/colours";
import { Rendering } from "../render/rendering";
import { Bar } from "../ui/bar";
import { Size } from "../utils/size";
import { ButtonComponent, ParagraphComponent } from "../ui/components";

export class DiagnosticsView extends View {

    public populateBar(bar: Bar): void {
        for (let x = 0; x < bar.columns; x++) {
            for (let y = 0; y < bar.rows; y++) {
                bar.addCell({
                    element: ButtonComponent({
                        child: ParagraphComponent({ text: `${x + 1}/${y + 1}` }),
                        colour: Colours.Secondary,
                        onClick: () => {
                            alert("Bar Button");
                        }
                    }),
                    column: x + 1,
                })
            }
        }
    }

    public populateGrid(grid: Grid): void {
        for (let x = 0; x < grid.columns; x++) {
            for (let y = 0; y < grid.rows; y++) {
                grid.addCell({
                    
                    element: ButtonComponent({
                        child: ParagraphComponent({ text: `${x + 1}/${y + 1}` }),
                        colour: Colours.Primary,
                        onClick: () => {
                            alert("Grid Button");
                        }
                    }),
                    column: x + 1,
                    row: y + 1
                })
            }
        }
    }

    public reset(): void {

    }
    public render(context: CanvasRenderingContext2D, size: Size): void {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        Rendering.renderGrid({
            cellSize: size.gcd,
            columns: size.width / size.gcd,
            rows: size.height / size.gcd,
            context: context,
            strokeColour: Colours.Blue,
            strokeWidth: 2
        });
    }
    public show(): void {

    }
    public hide(): void {

    }
    public destroy(): void {

    }
}