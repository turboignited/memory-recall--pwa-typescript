import { View } from "./view";
import { ButtonComponent, DivComponent, ParagraphComponent, Heading1Component, ButtonImageComponent, ImageComponent } from "../ui/components";
import { Colours } from "../utils/colours";
import { ViewType } from "./view_type";
import { App } from "../app";
import { Grid } from "../ui/grid";
import { Bar } from "../ui/bar";
import { Size } from "../utils/size";

/**
 * @implements View
 */
export class PauseView extends View {
    public render(context: CanvasRenderingContext2D, size: Size): void {
    }
    public show(): void {
    }
    public hide(): void {
    }
    public destroy(): void {
    }
    public reset(): void { }

    public populateBar(bar: Bar): void {
        bar.addCell({
            element: Heading1Component({
                text: "Paused"
            }),
            column: 1,
            columnSpan: bar.columns
        });
    }

    public populateGrid(grid: Grid): void {
        const background = DivComponent();

        const container = DivComponent();


        background.style.backgroundColor = Colours.IconPrimaryDark;
        container.style.backgroundColor = Colours.PrimaryLight;

        grid.addCell({
            element: background,
            column: 1,
            row: 1,
            rowSpan: grid.rows - 1,
            columnSpan: grid.columns
        })

        grid.addCell({
            element: container,
            column: 3,
            row: 5,
            rowSpan: 7,
            columnSpan: 5
        })

        grid.addCell({
            column: 4,
            row: 6,
            element: ButtonImageComponent({
                image: ImageComponent({
                    src: "images/play.png",
                    alt: "Continue"
                }),
                onClick: () => {
                    App.views.setView(ViewType.Game);

                }
            })
        });

        grid.addCell({
            column: 4,
            row: 8,
            element: ButtonImageComponent({
                image: ImageComponent({
                    src: "images/replay.png",
                    alt: "Restart"
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
            element: ButtonImageComponent({
                image: ImageComponent({
                    src: "images/quit.png",
                    alt: "Quit"
                }),
                onClick: () => {
                    App.views.destroyView(ViewType.Game);
                    App.views.setView(ViewType.Main);
                }
            })
        });
    }
}