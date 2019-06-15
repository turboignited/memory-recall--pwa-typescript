import { DivComponent, ButtonImageComponent, ImageComponent } from "../ui/components";
import { Colours } from "../utils/colours";
import { ViewType } from "./view_type";
import { App } from "../app";
import { View } from "./view";
import { Grid } from "../ui/grid";
import { Bar } from "../ui/bar";
import { Size } from "../utils/size";

/**
 * @implements View
 */
export class SuccessView extends View {
    public reset(): void {

    }
    public render(context: CanvasRenderingContext2D, size: Size): void {

    }

    public populateBar(bar: Bar): void { }

    public populateGrid(grid: Grid): void {
        const container = DivComponent();
        container.style.backgroundColor = Colours.PrimaryLight;

        grid.addCell({
            element: container,
            column: 3,
            row: 5,
            rowSpan: 7,
            columnSpan: 5
        })

        grid.addCell({
            column: 4,
            row: 8,
            columnSpan: 3,
            element: ButtonImageComponent({
                image: ImageComponent({
                    alt: "Next",
                    src: "images/play.png"
                }),
                onClick: () => {
                    App.views.resetView(ViewType.Game);
                    App.views.setView(ViewType.Game);
                }
            })
        });

        grid.addCell({
            column: 4,
            row: 10,
            columnSpan: 3,
            element: ButtonImageComponent({
                image: ImageComponent({
                    alt: "Quit",
                    src: "images/quit.png"
                }),
                onClick: () => {
                    App.views.destroyView(ViewType.Game);
                    App.views.setView(ViewType.Main);
                }
            })
        });
    }

    public show(): void {

    }
    public hide(): void {

    }
    public destroy(): void {

    }
}