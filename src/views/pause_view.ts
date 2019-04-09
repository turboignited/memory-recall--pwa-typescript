import { View } from "./view";
import { App } from "../app";
import { ViewType } from "./view_type";

export class PauseView extends View {
    public createUI(app: App): HTMLDivElement {
        const container = document.createElement("div");
        const resumeButton = document.createElement("button");
        resumeButton.innerText = "Resume";
        resumeButton.onclick = () => {
            app.setView(ViewType.Game);
        }
        const quitButton = document.createElement("button");
        quitButton.innerText = "Quit";
        quitButton.onclick = () => {
            const gameView = app.getView(ViewType.Game);
            if (gameView != undefined) {
                gameView.destroy();
            }
            app.setView(ViewType.Main);
        }
        container.appendChild(resumeButton);
        container.appendChild(quitButton);
        return container;
    }
}