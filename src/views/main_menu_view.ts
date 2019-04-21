import { View } from "./view";
import { Table } from "../ui/table";
import { Layout } from "../ui/layout";
import { GridLayout } from "../ui/grid_layout";
import { ButtonComponent, ImageComponent, CheckboxComponent, ParagraphComponent, Heading2Component, ContainerComponent } from "../ui/components";
import { ViewType } from "./view_type";
import { Colours } from "../utils/colours";
import { Preferences } from "../storage/preferences";
import { SpriteSelector } from "../ui/sprite_selector";
import { SpriteTypes } from "../assets/sprite_types";
import { Tabs } from "../ui/tabs";
import { Rendering } from "../render/rendering";

/**
 * @implements View
 */
export class MainMenuView extends View {

    private _playerScoreTable: Table | undefined;
    private _globalScoreTable: Table | undefined;

    public reset(): void {
    }

    public render(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.globalAlpha = 0.3;
        Rendering.renderGrid({
            context: context,
            cellSize: 80,
            columns: 9,
            rows: 16,
            strokeColour: "gray",
            strokeWidth: 1

        })
    }

    public createLayout(): Layout | void {
        const grid = new GridLayout();


        const playerScoreTable = new Table([
            Heading2Component("Mode"),
            Heading2Component("Score"),
            Heading2Component("Time"),
        ]);
        const globalScoresTable = new Table([
            Heading2Component("Mode"),
            Heading2Component("Score"),
            Heading2Component("Time"),
        ]);



        const scores = Preferences.getScores();

        for (let i = 0; i < scores.length; i++) {
            const score = scores[i];
            playerScoreTable.addRow([ParagraphComponent(SpriteTypes[score.type]),
            ParagraphComponent(score.score.toString()),
            ParagraphComponent(score.time.toString()),
            ButtonComponent("X", Colours.Red, () => {
                if (this._playerScoreTable != undefined) {
                    this._playerScoreTable.deleteRow(i + 1);
                }
                Preferences.deleteScore(score.type);
            })]);
        }


        const spriteSelector = new SpriteSelector((index: number) => {
            Preferences.setActiveSprite(index);
            if (this._playerScoreTable != undefined) {
                this._playerScoreTable.highlightRow(index + 1, Colours.Secondary);
            }
        });

        const scoresTabs = new Tabs();
        scoresTabs.addTab(Heading2Component("You"), playerScoreTable.tableElement);
        scoresTabs.addTab(Heading2Component("Global"), globalScoresTable.tableElement);
        scoresTabs.showTab(0);

        grid.add({
            element: ImageComponent({
                width: 80,
                height: 80,
                src: "images/logo.png",
                alt: "TurboIgnited Logo"
            }),
            column: 1,
            row: 1
        });
        grid.add({
            element: ParagraphComponent("Online"),
            column: 9,
            row: 1
        });

        grid.add({
            element: scoresTabs.tabs,
            column: 2,
            row: 2,
            columnSpan: 7
        });
        grid.add({
            element: scoresTabs.tab,
            column: 2,
            row: 3,
            columnSpan: 7,
            rowSpan: 6
        });

        grid.add({
            element: spriteSelector.leftButton,
            column: 3,
            row: 10
        });
        grid.add({
            element: spriteSelector.rightButton,
            column: 7,
            row: 10
        });
        grid.add({
            element: spriteSelector.titleHeading,
            column: 4,
            row: 9,
            columnSpan: 3
        });

        grid.add({
            element: spriteSelector.selectionContainer,
            column: 5,
            row: 10
        });

        grid.add({
            element: ButtonComponent("Play", Colours.Secondary, () => {
                View.views.setView(ViewType.Game);
            }),
            column: 4,
            row: 12,
            columnSpan: 3
        });


        grid.add({
            element: ButtonComponent("Help", Colours.Secondary, () => {
                View.views.setView(ViewType.Help);
            }),
            column: 4,
            row: 14,
            columnSpan: 3
        });

        grid.add({
            element: ParagraphComponent("Accept terms and conditions"),
            column: 2,
            row: 16,
            columnSpan: 7
        });

        grid.add({
            element: CheckboxComponent(Preferences.termsAccepted, "Accept terms and conditions", () => {
                Preferences.toggleTermsAndConditions();
            }),
            column: 9,
            row: 16
        });

        this._playerScoreTable = playerScoreTable;
        this._globalScoreTable = globalScoresTable;

        return grid;
    }

    public onShow(): void {
        if (this._playerScoreTable != undefined) {
            const scores = Preferences.getScores();

            for (let i = 0; i < scores.length; i++) {
                const score = scores[i];
                this._playerScoreTable.addOrReplaceRow(i + 1, [
                    ParagraphComponent(SpriteTypes[score.type]),
                    ParagraphComponent(score.score.toString()),
                    ParagraphComponent(score.time.toString()),
                    ButtonComponent("X", Colours.Red, () => {
                        if (this._playerScoreTable != undefined) {
                            this._playerScoreTable.deleteRow(i + 1);
                        }
                        Preferences.deleteScore(score.type);
                    })])
            }
        }
        if (Preferences.termsAccepted && this._globalScoreTable != undefined) {
            // TODO: Collect scores
        }
    }


    public onHide(): void {

    }

    public onDestroy(): void {

    }
}