import { View } from "./view";
import { Grid } from "../ui/grid";
import { Table } from "../ui/table";
import { SpriteTypes } from "../assets/sprite_types";
import { App } from "../app";
import { Selector } from "../ui/selector";
import { CheckboxComponent, ButtonComponent, Heading1Component, Heading2Component, ParagraphComponent, AnchorComponent, ContainerComponent, ImageComponent, Heading3Component } from "../ui/components";
import { ViewType } from "./view_type";
import { Rendering } from "../render/rendering";

export class MainMenuView extends View {

    private _playerScoreTable!: Table;

    public reset(): void {
    }

    public render(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.globalAlpha = 0.2;
        Rendering.renderGrid({
            cellSize: App.dimensions.gcd,
            columns: App.dimensions.width / App.dimensions.gcd,
            rows: App.dimensions.height / App.dimensions.gcd,
            context: context,
            strokeColour: "#199EFF",
            strokeWidth: 2
        });
    }
    public onShow(): void {
        console.log(this._playerScoreTable);
    }

    public createCells(grid: Grid): void {
        const logo = ImageComponent("images/logo.png");
        const modeHeading = Heading3Component("Mode");
        const scoreHeading = Heading3Component("Score");
        const timeHeading = Heading3Component("Time");

        this._playerScoreTable = new Table([modeHeading, scoreHeading, timeHeading]);

        let playerScores = App.preferences.getScores();
        for (let i = 0; i < playerScores.length; i++) {
            const score = playerScores[i];
            const modeText = ParagraphComponent(SpriteTypes[score.type]);
            const scoreText = ParagraphComponent(score.score.toString())
            const timeText = ParagraphComponent(score.time.toString())
            this._playerScoreTable.addRow([modeText, scoreText, timeText])
            this._playerScoreTable.addCell(i + 1, ButtonComponent("x", () => {
                App.preferences.deleteScore(score.type);
                this._playerScoreTable.deleteRow(score.type + 1);
            }));
        }
        const spriteSelector = new Selector([
            {
                element: App.assets.sprites.getSprite(SpriteTypes.Numbers, 0).image,
                title: SpriteTypes[SpriteTypes.Numbers]
            },
            {
                element: App.assets.sprites.getSprite(SpriteTypes.Letters, 0).image,
                title: SpriteTypes[SpriteTypes.Letters]
            }
        ], (index: number) => {
            this._playerScoreTable.highlightRow(index as SpriteTypes, "yellow");
            App.preferences.setActiveSprite(index as SpriteTypes);
        }, App.preferences.activeSprite);


        const onlineIndicator = ParagraphComponent("");
        if (false) {
            onlineIndicator.innerHTML = "&#10687;";
        } else {
            onlineIndicator.innerHTML = "&#10686;";
        }

        const scoresTitle = Heading2Component("Scores");

        const appTitle = Heading1Component("Memory Recall");

        const bottomContainer = ContainerComponent();
        const termsCheckbox = CheckboxComponent(App.preferences.termsAccepted, () => {
            App.preferences.toggleTermsAndConditions();
        });

        const acceptText = ParagraphComponent("Accept ")
        const acceptLink = AnchorComponent("https://turboignited.com/terms-and-conditions", "terms and conditions.");
        acceptText.appendChild(acceptLink);


        const playButton = ButtonComponent("Play", () => {
            App.views.setView(ViewType.Game);
        });

        const helpButton = ButtonComponent("Help", () => {
            App.views.setView(ViewType.Help);
        });

        grid.addCell({
            type: this.type,
            element: logo,
            row: 1,
            column: 1
        });
        grid.addCell({
            type: this.type,
            element: appTitle,
            row: 1,
            rowSpan: 2,
            column: 2,
            columnSpan: grid.columns - 2
        });
        grid.addCell({
            type: this.type,
            element: onlineIndicator,
            row: 1,
            column: grid.columns
        });
        grid.addCell({
            type: this.type,
            element: scoresTitle,
            row: 3,
            rowSpan: 1,
            column: 1,
            columnSpan: grid.columns
        });
        grid.addCell({
            type: this.type,
            element: this._playerScoreTable.tableElement,
            row: 4,
            rowSpan: 5,
            column: 1,
            columnSpan: grid.columns
        });
        grid.addCell({
            type: this.type,
            element: spriteSelector.titleHeading,
            row: 11,
            column: 4,
            columnSpan: 3
        });
        grid.addCell({
            type: this.type,
            element: spriteSelector.leftButton,
            row: 12,
            column: 2,
            columnSpan: 2
        });
        grid.addCell({
            type: this.type,
            element: spriteSelector.selectionContainer,
            row: 10,
            rowSpan: 1,
            column: Math.floor(grid.columns * 0.5) + 1,
            columnSpan: 1
        });

        grid.addCell({
            type: this.type,
            element: spriteSelector.rightButton,
            row: 12,
            column: grid.columns - 2,
            columnSpan: 2
        });
        grid.addCell({
            type: this.type,
            element: playButton,
            row: 12,
            column: Math.floor(grid.columns * 0.5),
            columnSpan: 3
        });

        grid.addCell({
            type: this.type,
            element: bottomContainer,
            row: grid.rows,
            column: 1,
            columnSpan: grid.columns
        });

        grid.addCell({
            type: this.type,
            element: helpButton,
            row: grid.rows,
            column: 1,
            columnSpan: 1
        });

        grid.addCell({
            type: this.type,
            element: acceptText,
            row: grid.rows,
            column: 2,
            columnSpan: grid.columns - 2

        });
        grid.addCell({
            type: this.type,
            element: termsCheckbox,
            row: grid.rows,
            column: grid.columns,
            columnSpan: 1
        });
    }

    public onHide(): void {

    }

    public onDestroy(): void {

    }
}