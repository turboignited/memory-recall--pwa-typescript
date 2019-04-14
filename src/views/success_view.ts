import { View } from "./view";
import { Grid } from "../ui/grid";
import { App } from "../app";
import { Button } from "../ui/components";
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
        const nextButton = Button("Next", () => {
            App.views.setView(ViewType.Game);
        });
        const quitButton = Button("Quit", () => {
            const gameView = App.views.getView(ViewType.Game);
            if (gameView != undefined) {
                gameView.destroy();
            }
            App.views.setView(ViewType.Main);
        });
        grid.addCell({
            type: this.type,
            element: nextButton,
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
    public onShow(): void {

    }
    public onHide(): void {

    }
    public onDestroy(): void {

    }
}