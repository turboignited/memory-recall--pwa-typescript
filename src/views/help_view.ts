import { View } from "./view";
import { Layout } from "../ui/layout";

/**
 * @implements View
 */
export class HelpView extends View {
    public reset(): void { }

    public render(context: CanvasRenderingContext2D): void {
        // context.textAlign = "center";
        // context.fillStyle = "red";
        // context.fillText("Hello", App.dimensions.width * 0.5, App.dimensions.height * 0.5);

    }
    // public create(container:Container<ViewType>): void {

    // }
    public createLayout(): Layout | void {

    }
    public onShow(): void {

    }
    public onHide(): void {

    }
    public onDestroy(): void {

    }
}