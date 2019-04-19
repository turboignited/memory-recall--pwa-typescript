import { View } from "./view";
import { Grid } from "../ui/grid";
import { App } from "../app";
import { ButtonComponent } from "../ui/components";
import { ViewType } from "./view_type";


export class SuccessView extends View {
    public reset(): void {

    }
    public render(context: CanvasRenderingContext2D): void {
        const score = App.preferences.lastSavedScore;
        if (score != undefined) {
            context.textAlign = "center";
            context.font = "60 serif";
            context.fillText(`Mode: ${score.type}`, App.dimensions.width * 0.5, App.dimensions.height * 0.2, App.dimensions.width);
            context.fillText(`Score: ${score.score}`, App.dimensions.width * 0.5, App.dimensions.height * 0.4, App.dimensions.width);
            context.fillText(`Time: ${score.time}`, App.dimensions.width * 0.5, App.dimensions.height * 0.6, App.dimensions.width);
        }
    }
    public createCells(grid: Grid): void {
        const nextButton = ButtonComponent("Next", () => {
            App.views.setView(ViewType.Game);
        });
        const quitButton = ButtonComponent("Quit", () => {
            const gameView = App.views.getView(ViewType.Game);
            if (gameView != undefined) {
                gameView.destroy();
            }
            App.views.setView(ViewType.Main);
        });
        grid.addCell({
            type: this.type,
            element: nextButton,
            row: Math.floor(grid.rows * 0.5),
            column: Math.floor(grid.columns * 0.5),
            columnSpan: 3,
            rowSpan: 1
        });
        grid.addCell({
            type: this.type,
            element: quitButton,
            row: Math.floor(grid.rows * 0.5) + 2,
            column: Math.floor(grid.columns * 0.5),
            columnSpan: 3,
            rowSpan: 1
        });
    }
    public onShow(): void {

    }
    public onHide(): void {

    }
    public onDestroy(): void {

    }
}