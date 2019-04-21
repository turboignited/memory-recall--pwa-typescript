import { View } from "./view";
import { Layout } from "../ui/layout";
import { GridLayout } from "../ui/grid_layout";
import { ContainerComponent, ButtonComponent } from "../ui/components";
import { Colours } from "../utils/colours";
import { ViewType } from "./view_type";

/**
 * @implements View
 */
export class SuccessView extends View {
    public reset(): void {

    }
    public render(context: CanvasRenderingContext2D): void {
        // const score = App.preferences.lastSavedScore;
        // if (score != undefined) {
        //     context.textAlign = "center";
        //     context.font = "60 serif";
        //     context.fillText(`Mode: ${score.type}`, App.dimensions.width * 0.5, App.dimensions.height * 0.2, App.dimensions.width);
        //     context.fillText(`Score: ${score.score}`, App.dimensions.width * 0.5, App.dimensions.height * 0.4, App.dimensions.width);
        //     context.fillText(`Time: ${score.time}`, App.dimensions.width * 0.5, App.dimensions.height * 0.6, App.dimensions.width);
        // }
    }

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
            row: 8,
            columnSpan: 3,
            element: ButtonComponent("Next", Colours.Secondary, () => {
                View.views.resetView(ViewType.Game);
                View.views.setView(ViewType.Game);
            })
        });

        grid.add({
            column: 4,
            row: 10,
            columnSpan: 3,
            element: ButtonComponent("Exit", Colours.Red, () => {
                View.views.destroyView(ViewType.Game);
                View.views.setView(ViewType.Main);
            })
        });
        return grid;
    }
   
    public onShow(): void {

    }
    public onHide(): void {

    }
    public onDestroy(): void {

    }
}