import { View } from "./view";
import { Loader } from "../utils/loader";
import { ViewType } from "./view_type";
import { App } from "../app";
import { Preferences } from "../storage/preferences";


export class MainMenuView extends View {

    constructor(type: ViewType, app: App) {
        super(type, app);
    }

    public load(loader: Loader<ViewType>): void {

    }

    public createUI(app: App): HTMLDivElement {
        const container = document.createElement("div");

        const container1 = document.createElement("div");

        const logo = document.createElement("img");
        logo.src = "images/logo.png";

        const titleText = document.createElement("h1");
        titleText.innerText = "Memory Recall";

        const onlineContainer = document.createElement("div");
        const onlineStatus = document.createElement("p");
        const onlineIndicator = document.createElement("b");
        onlineIndicator.innerText = "⦿";
        onlineStatus.innerHTML = "Online &nbsp;";
        onlineIndicator.style.color = "green";
        onlineStatus.appendChild(onlineIndicator);
        onlineContainer.appendChild(onlineStatus);


        container1.style.display = "flex";
        container1.style.justifyContent = "space-between";
        container1.style.alignItems = "center";
        container1.appendChild(logo);
        container1.appendChild(titleText);
        container1.appendChild(onlineStatus);


        const container2 = document.createElement("div");
        const topScore = document.createElement("p");
        const globalScore = document.createElement("p");

        topScore.innerText = "2";
        globalScore.innerText = "?";

        const container2Left = document.createElement("div");
        const container2Right = document.createElement("div");
        const container2Center = document.createElement("div");


        const topScoreTitle = document.createElement("h3");

        topScoreTitle.innerText = "Your Score";
        const globalScoreTitle = document.createElement("h3");
        globalScoreTitle.innerText = "Global Score";

        container2Left.style.display = "flex";
        container2Left.style.flexDirection = "column";
        container2Left.style.justifyContent = "space-evenly";
        container2Left.style.alignItems = "center";
        container2Center.style.display = "flex";
        container2Center.style.flexDirection = "column";
        container2Center.style.justifyContent = "space-evenly";
        container2Center.style.alignItems = "center";
        container2Right.style.display = "flex";
        container2Right.style.flexDirection = "column";
        container2Right.style.justifyContent = "space-evenly";
        container2Right.style.alignItems = "center";


        const playButton = document.createElement("button");
        playButton.style.width = "8rem";
        playButton.style.height = "3rem";
        playButton.style.margin = "1rem";
        playButton.style.border = "2px solid yellow";
        playButton.style.backgroundColor = "green";
        playButton.style.borderRadius = "0.5rem";
        playButton.innerText = "Play";
        playButton.onclick = () => {
            app.setView(ViewType.Game);
        }

        container2Center.appendChild(playButton);

        container2Left.appendChild(topScoreTitle);
        container2Left.appendChild(topScore);

        container2Right.appendChild(globalScoreTitle);

        container2Right.appendChild(globalScore);


        container2.style.display = "flex";
        container2.style.justifyContent = "space-between";
        container2.style.alignItems = "top";
        container2.appendChild(container2Left);
        container2.appendChild(container2Center);
        container2.appendChild(container2Right);







        const container3 = document.createElement("div");
        const termsLink = document.createElement("a");
        termsLink.href = "http://turboignited.com/terms-and-condition";
        termsLink.innerText = "terms and conditions";

        const checkTerms = document.createElement("input");
        checkTerms.type = "checkbox";
        checkTerms.checked = Preferences.termsAccepted;
        checkTerms.onchange = () => {
            Preferences.updateTerms();
        }


        const acceptText = document.createElement("p");
        acceptText.innerText = "Accept "
        acceptText.appendChild(termsLink);
        acceptText.appendChild(checkTerms);

        const termsReason = document.createElement("p");
        termsReason.innerText = "You must agree to allow saving your score and accessing online services";


        container3.style.display = "flex";
        container3.style.flexDirection = "column";
        container3.style.alignItems = "center";
        container3.appendChild(termsReason);
        container3.appendChild(acceptText);






        container.appendChild(container1);
        container.appendChild(container2);
        container.appendChild(container3);
        return container;
    }


    public render(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
    }
}
