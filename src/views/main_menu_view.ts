import { View } from "./view";
import { ViewType } from "./view_type";
import { Grid } from "../ui/grid";
import { App } from "../app";
import { Checkbox, Button } from "../ui/components";
import { Table } from "../ui/table";
import { Selector, Selection } from "../ui/selector";
import { SpriteTypes } from "../assets/sprite_types";

/**
 * @implements View
 */
export class MainMenuView extends View {
    public onShow(): void {

    }
    public onHide(): void {
    }
    public onDestroy(): void {
    }

    public render(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, App.dimensions.width, App.dimensions.height);
    }
    public reset(): void { }

    public createCells(grid: Grid): void {
        const logo = document.createElement("img");
        const globalScoresTable = new Table(["Mode", "Score"]);
        const playerScoreTable = new Table(["Mode", "Score"]);
        /**
         * Sprite Selector
         */
        const selections: Selection<SpriteTypes>[] = [];
        const typeValues = Object.values(SpriteTypes);
        for (let i = 0; i < Math.round(Object.keys(SpriteTypes).length / 2); i++) {
            selections.push({
                element: App.assets.sprites.getSprite(i, 0).image,
                type: typeValues[i * 2]
            });
        }
        console.log(App.preferences.activeSprite)
        const spriteSelector = new Selector<SpriteTypes>(selections, (type: SpriteTypes) => {
            App.preferences.setActiveSprite(type);

        }, App.preferences.activeSprite);

        logo.src = "images/logo.png";
        // logo.style.width = "100%";
        // logo.style.height = "auto";
        const onlineIndicator = document.createElement("p");
        if (false) {
            onlineIndicator.innerHTML = "&#10687;"
        } else {
            onlineIndicator.innerHTML = "&#10686;"
        }

        const playerScore = document.createElement("p");
        playerScore.innerText = App.preferences.getScore(SpriteTypes.Numbers).toString();

        const topContainer = document.createElement("div");
        topContainer.style.boxShadow = "0 0 4px black";
        const rightTitle = document.createElement("h2");
        rightTitle.innerText = "Global Scores"

        const rightContainer = document.createElement("div");
        rightContainer.style.boxShadow = "0 0 4px black";

        const leftContainer = document.createElement("div");
        leftContainer.style.boxShadow = "0 0 4px black";


        const leftTitle = document.createElement("h2");
        leftTitle.innerText = "Your Scores"

        const topTitle = document.createElement("h1");
        topTitle.innerText = "Memory Recall";


        const termsCheckbox = Checkbox(App.preferences.termsAccepted, () => {
            App.preferences.toggleTermsAndConditions();
        });

        termsCheckbox.style.verticalAlign = "top";
        termsCheckbox.style.alignSelf = "center"
        const acceptText = document.createElement("p");
        acceptText.innerText = "Accept "
        const acceptLink = document.createElement("a");
        acceptLink.href = "https://turboignited.com/terms-and-conditions";
        acceptLink.innerText = "terms and conditions."
        acceptText.appendChild(acceptLink);
        acceptText.style.alignSelf = "center"

        const playButton = Button("Play", () => {
            App.views.setView(ViewType.Game);
        });

        const helpButton = Button("Help", () => {
            App.views.setView(ViewType.Help);
        });
        grid.addCell({
            type: this.type,
            element: topContainer,
            row: 1,
            rowSpan: 2,
            column: 1,
            columnSpan: grid.columns
        });
        grid.addCell({
            type: this.type,
            element: logo,
            row: 1,
            rowSpan: 2,
            columnSpan: 2,
            column: 1
        });

        grid.addCell({
            type: this.type,
            element: onlineIndicator,
            row: 1,
            rowSpan: 2,
            columnSpan: 2,
            column: grid.columns - 1
        });

        grid.addCell({
            type: this.type,
            element: topTitle,
            row: 1,
            rowSpan: 1,
            column: 3,
            columnSpan: grid.columns - 4
        });
        grid.addCell({
            type: this.type,
            element: leftContainer,
            row: 3,
            rowSpan: 6,
            column: 1,
            columnSpan: 5
        });
        grid.addCell({
            type: this.type,
            element: leftTitle,
            row: 3,
            rowSpan: 1,
            column: 1,
            columnSpan: 5
        });
        grid.addCell({
            type: this.type,
            element: playerScoreTable.element,
            row: 4,
            rowSpan: 5,
            column: 1,
            columnSpan: 5
        });
        grid.addCell({
            type: this.type,
            element: spriteSelector.leftButton,
            row: grid.rows - 5,
            column: 7
        });
        grid.addCell({
            type: this.type,
            element: spriteSelector.selectionContainer,
            row: grid.rows - 5,
            column: 8,
            columnSpan: 2
        });
        grid.addCell({
            type: this.type,
            element: spriteSelector.titleHeading,
            row: grid.rows - 6,
            column: 7,
            columnSpan: 4
        });
        grid.addCell({
            type: this.type,
            element: spriteSelector.rightButton,
            row: grid.rows - 5,
            column: 10
        });
        grid.addCell({
            type: this.type,
            element: playButton,
            row: grid.rows - 3,
            column: grid.columns * 0.5,
            columnSpan: 2
        });

        grid.addCell({
            type: this.type,
            element: helpButton,
            row: grid.rows - 1,
            column: grid.columns * 0.5,
            columnSpan: 2
        });

        grid.addCell({
            type: this.type,
            element: rightContainer,
            row: 3,
            rowSpan: 6,
            column: 12,
            columnSpan: 5
        });
        grid.addCell({
            type: this.type,
            element: globalScoresTable.element,
            row: 4,
            rowSpan: 5,
            column: 12,
            columnSpan: 5
        })
        grid.addCell({
            type: this.type,
            element: rightTitle,
            row: 3,
            rowSpan: 1,
            column: 12,
            columnSpan: 5
        });
        grid.addCell({
            type: this.type,
            element: acceptText,
            row: grid.rows,
            column: 1,
            columnSpan: grid.columns

        });
        grid.addCell({
            type: this.type,
            element: termsCheckbox,
            row: grid.rows,
            column: grid.columns,
        });






    }
    public hideCells(grid: Grid): void {
    }

}
