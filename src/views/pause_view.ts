import { View } from "./view";
import { Layout } from "../ui/layout";
import { GridLayout } from "../ui/grid_layout";
import { ButtonComponent, ContainerComponent } from "../ui/components";
import { Colours } from "../utils/colours";
import { ViewType } from "./view_type";

/**
 * @implements View
 */
export class PauseView extends View {
    public render(context: CanvasRenderingContext2D): void {
    }
    public onShow(): void {
    }
    public onHide(): void {
    }
    public onDestroy(): void {
    }
    public reset(): void { }
    public createLayout(): Layout | void {
        const grid = new GridLayout();
        const container = ContainerComponent();
        container.style.backgroundColor=Colours.PrimaryLight;

        grid.add({
            element: container,
            column: 3,
            row: 5,
            rowSpan: 7,
            columnSpan: 5
        })

        grid.add({
            column: 4,
            row: 6,
            columnSpan: 3,
            element: ButtonComponent("Resume", Colours.Secondary, () => {
                View.views.setView(ViewType.Game);

            })
        });

        grid.add({
            column: 4,
            row: 8,
            columnSpan: 3,
            element: ButtonComponent("Restart", Colours.Secondary, () => {
                View.views.resetView(ViewType.Game);
                View.views.setView(ViewType.Game);
            })
        });

        grid.add({
            column: 4,
            row: 10,
            columnSpan: 3,
            element: ButtonComponent("Quit", Colours.Secondary, () => {
                View.views.destroyView(ViewType.Game);
                View.views.setView(ViewType.Main);
            })
        });


        return grid;

    }
    // public create(container: Container<ViewType>): void {
    //     // const background = ContainerComponent();
    // const resumeButton = ButtonComponent("Resume", () => {

    // });
    // const restartButton = ButtonComponent("Restart", () => {

    // });
    // const quitButton = ButtonComponent("Quit", () => {

    // });

    //     // background.style.background = "linear-gradient(0deg,white,orange)"

    //     // grid.addCell({
    //     //     type: this.type,
    //     //     element: background,
    //     //     row: 2,
    //     //     column: 2,
    //     //     columnSpan: grid.columns - 2,
    //     //     rowSpan: grid.rows - 2
    //     // });
    //     // grid.addCell({
    //     //     type: this.type,
    //     //     element: resumeButton,
    //     //     row: Math.floor(grid.rows * 0.5),
    //     //     column: Math.floor(grid.columns * 0.5),
    //     //     columnSpan: 3,
    //     //     rowSpan: 1
    //     // });
    //     // grid.addCell({
    //     //     type: this.type,
    //     //     element: restartButton,
    //     //     row: Math.floor(grid.rows * 0.5) + 2,
    //     //     column: Math.floor(grid.columns * 0.5),
    //     //     columnSpan: 3,
    //     //     rowSpan: 1
    //     // });
    //     // grid.addCell({
    //     //     type: this.type,
    //     //     element: quitButton,
    //     //     row: Math.floor(grid.rows * 0.5) + 4,
    //     //     column: Math.floor(grid.columns * 0.5),
    //     //     columnSpan: 3,
    //     //     rowSpan: 1
    //     // });

    // }
}