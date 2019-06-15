import { View } from "./view";
import { Table } from "../ui/table";
import { ButtonComponent, ImageComponent, CheckboxComponent, ParagraphComponent, Heading2Component, DivComponent, ButtonImageComponent } from "../ui/components";
import { ViewType } from "./view_type";
import { Colours } from "../utils/colours";
import { Preferences } from "../storage/preferences";
import { SpriteSelector } from "../ui/sprite_selector";
import { SpriteTypes } from "../assets/sprite_types";
import { Tabs } from "../ui/tabs";
import { Rendering } from "../render/rendering";
import { App } from "../app";
import { Scores, IScore } from "../storage/scores";
import { Grid } from "../ui/grid";
import { Bar } from "../ui/bar";
import { Size } from "../utils/size";

/**
 * @implements View
 */
export class MainMenuView extends View {

    private _playerScoreTable: Table | undefined;
    private _globalScoreTable: Table | undefined;

    public reset(): void {
    }

    public render(context: CanvasRenderingContext2D, size: Size): void {
        context.globalAlpha = 1.0;
        context.clearRect(0, 0, size.width, size.height);
        Rendering.renderGrid({
            context: context,
            cellSize: size.gcd,
            rowOffset: 1,
            columns: size.width / size.gcd,
            rows: size.height / size.gcd,
            strokeColour: Colours.IconPrimary,
            strokeWidth: 2
        });
    }

    public populateBar(bar: Bar): void {
        bar.addCell({
            column: 1,
            element: ButtonImageComponent({
                image: ImageComponent({
                    alt: "Settings",
                    src: "images/gear.png",
                }),
                onClick: () => {
                    App.views.setView(ViewType.Settings);
                }
            })
        });
        // bar.addCell({
        //     element: Heading2Component({
        //         text: "Memory Recall"
        //     }),
        //     column: 3,
        //     columnSpan: bar.columns - 3,
        //     row: 1,
        // })
        bar.addCell({
            column: bar.columns,
            element: ButtonImageComponent({
                image: ImageComponent({
                    alt: "Help",
                    src: "images/help.png"
                }),
                onClick: () => {
                    App.views.setView(ViewType.Help);
                }
            }),

        });
    }

    public populateGrid(grid: Grid): void {


        const playerScoreTable = new Table({
            headings: [
                Heading2Component({ text: "Mode" }),
                Heading2Component({ text: "Score" }),
                Heading2Component({ text: "Time" }),
            ]
        });
        const globalScoresTable = new Table({
            headings: [
                Heading2Component({ text: "Mode" }),
                Heading2Component({ text: "Score" }),
                Heading2Component({ text: "Time" }),
            ]
        });



        const scores: IScore[] = Scores.getScores();

        for (let i = 0; i < scores.length; i++) {
            const score = scores[i];
            playerScoreTable.addRow([ParagraphComponent({ text: SpriteTypes[score.type] }),
            ParagraphComponent({ text: score.score.toString() }),
            ParagraphComponent({ text: score.time.toString() }),
            ButtonComponent({
                child: ParagraphComponent({ text: "X" }),
                colour: Colours.Red,
                onClick: () => {
                    if (this._playerScoreTable != undefined) {
                        this._playerScoreTable.deleteRow(i + 1);
                    }
                    Scores.deleteScore(score.type);
                }
            })]);
        }


        const spriteSelector = new SpriteSelector({
            selectionCallback: (index: number) => {
                Preferences.setActiveSprite(index);
                if (this._playerScoreTable != undefined) {
                    this._playerScoreTable.highlightRow(index + 1, Colours.Secondary);
                }
            }
        });

        const nextSpriteButton = ButtonImageComponent({
            image: ImageComponent({
                alt: "Next Sprite",
                src: "images/next.png",
            }),
            onClick: () => {
                spriteSelector.selectNext();
            }
        });

        const previousSpriteButton = ButtonImageComponent({
            image: ImageComponent({
                alt: "Previous Sprite",
                src: "images/previous.png",
            }),
            onClick: () => {
                spriteSelector.selectPrevious();
            }
        });

        const scoresTabs = new Tabs();
        scoresTabs.addTab(Heading2Component({ text: "You" }), playerScoreTable.tableElement);
        scoresTabs.addTab(Heading2Component({ text: "Global" }), globalScoresTable.tableElement);
        scoresTabs.showTab(0);




        // grid.addCell({
        //     element: ParagraphComponent({ text: "Online" }),
        //     column: grid.columns,
        //     row: 1
        // });

        // grid.addCell({
        //     element: scoresTabs.headings,
        //     column: 1,
        //     row: 2,
        //     columnSpan: grid.columns
        // });
        // grid.addCell({
        //     element: scoresTabs.tab,
        //     column: 1,
        //     row: 3,
        //     columnSpan: grid.columns,
        //     rowSpan: 6
        // });

        grid.addCell({
            element: previousSpriteButton,
            column: 3,
            row: 10
        });
        grid.addCell({
            element: nextSpriteButton,
            column: 7,
            row: 10
        });
        grid.addCell({
            element: spriteSelector.titleHeading,
            column: Math.round(grid.columns * 0.5) - 1,
            row: 9,
            columnSpan: 3
        });

        grid.addCell({
            element: spriteSelector.selectionContainer,
            column: 5,
            row: 10
        });


        grid.addCell({
            element: ButtonImageComponent({
                image: ImageComponent({
                    src: "images/play.png",
                    alt: "Play"
                }),
                onClick: () => {
                    App.views.setView(ViewType.Game);
                }
            }),
            column: Math.round(grid.columns * 0.5),
            row: 12,
        });




        // grid.addCell({
        //     element: ParagraphComponent({ text: "Accept terms and conditions" }),
        //     column: 1,
        //     row: grid.rows,
        //     columnSpan: grid.columns
        // });



        this._playerScoreTable = playerScoreTable;
        this._globalScoreTable = globalScoresTable;
    }

    public show(): void {
        if (this._playerScoreTable != undefined) {
            // const scores: IScore[] = Scores.getScores();

            // for (let i = 0; i < scores.length; i++) {
            //     const score = scores[i];
            //     this._playerScoreTable.addOrReplaceRow(i + 1, [
            //         ParagraphComponent(SpriteTypes[score.type]),
            //         ParagraphComponent(score.score.toString()),
            //         ParagraphComponent(score.time.toString()),
            //         ButtonComponent({
            //             child: ParagraphComponent("X"),
            //             colour: Colours.Red,
            //             onClick: () => {
            //                 if (this._playerScoreTable != undefined) {
            //                     this._playerScoreTable.deleteRow(i + 1);
            //                 }
            //                 Scores.deleteScore(score.type);
            //             }
            //         })])
            // }
        }
        if (Preferences.termsAccepted && this._globalScoreTable != undefined) {
            // TODO: Collect scores
        }
    }


    public hide(): void {

    }

    public destroy(): void {

    }
}