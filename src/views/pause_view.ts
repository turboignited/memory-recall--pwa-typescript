import { View } from "./view";
import { Grid } from "../ui/grid";
import { ViewType } from "./view_type";
import { App } from "../app";
import { Button } from "../ui/components";

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
    public createCells(grid: Grid): void {
        const background = document.createElement("div");
        background.style.boxShadow = "0 0 10px black";
        const resumeButton = Button("Resume", () => {
            App.views.setView(ViewType.Game);

        });
        const restartButton = Button("Restart", () => {
            const gameView = App.views.getView(ViewType.Game);
            if (gameView != undefined) {
                gameView.reset();
            }
            App.views.setView(ViewType.Game);
        });
        const quitButton = Button("Quit", () => {
            const gameView = App.views.getView(ViewType.Game);
            if (gameView != undefined) {
                gameView.destroy();
            }
            App.views.setView(ViewType.Main);
        });

        background.style.background = "linear-gradient(0deg,white,orange)"

        grid.addCell({
            type: this.type,
            element: background,
            row: 2,
            column: 2,
            columnSpan: grid.columns - 2,
            rowSpan: grid.rows - 2
        });
        grid.addCell({
            type: this.type,
            element: resumeButton,
            row: 3,
            column: grid.columns * 0.5,
            columnSpan: 2,
            rowSpan: 1
        });
        grid.addCell({
            type: this.type,
            element: restartButton,
            row: 5,
            column: grid.columns * 0.5,
            columnSpan: 2,
            rowSpan: 1
        });
        grid.addCell({
            type: this.type,
            element: quitButton,
            row: 7,
            column: grid.columns * 0.5,
            columnSpan: 2,
            rowSpan: 1
        });

    }
}