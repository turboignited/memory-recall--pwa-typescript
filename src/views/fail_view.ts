import { View } from "./view";
import { Grid } from "../ui/grid";
import { App } from "../app";
import { Button } from "../ui/components";
import { ViewType } from "./view_type";


export class FailView extends View {
    public reset(): void {

    }
    public render(context: CanvasRenderingContext2D): void {

    }
    public createCells(grid: Grid): void {
        const retryButton = Button("Retry", () => {
            const gameView = App.views.getView(ViewType.Game);
            if (gameView != undefined) {
                gameView.reset();
            }
            App.views.setView(ViewType.Game);
        });
        grid.addCell({
            type: this.type,
            element: retryButton,
            row: 5,
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