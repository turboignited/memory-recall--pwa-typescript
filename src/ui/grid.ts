import { App } from "../app";
import { ViewType } from "../views/view_type";
import { AddCellArgs } from "./grid_arguments";
import { Dimensions } from "../utils/dimensions";

export class Grid {
    private _container: HTMLDivElement;
    private _columns: number;
    private _rows: number;
    private _cells: HTMLElement[][];
    public get container(): HTMLDivElement {
        return this._container;
    }
    public get columns(): number {
        return this._columns;
    }
    public get rows(): number {
        return this._rows;
    }
    public set rows(value: number) {
        this._container.style.gridTemplateRows = `repeat(${value}, 1fr)`;
        this._rows = value;
    }

    public set columns(value: number) {
        this._container.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
        this._columns = value;
    }

    constructor(background: HTMLElement, dimensions: Dimensions) {
        const container = document.createElement("div");
        const rows = dimensions.height / dimensions.gcd;
        const columns = dimensions.width / dimensions.gcd;
        container.style.display = "grid";
        container.style.margin = "0 auto"
        container.style.width = `${dimensions.width * dimensions.scale}px`;
        container.style.height = `${dimensions.height * dimensions.scale}px`;
        container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        background.style.border = "1px solid #0C6DB3";
        background.style.backgroundColor = "#199EFF";

        background.style.zIndex = "0";
        background.style.gridRow = `${1} / span ${rows}`;
        background.style.msGridRow = `${1} / span ${rows}`;
        background.style.gridColumn = `${1} / span ${columns}`;
        background.style.msGridColumn = `${1} / span ${columns}`;

        container.appendChild(background);

        this._container = container;
        this._columns = columns;
        this._rows = rows;
        this._cells = [];
    }

    public contains(type: ViewType): boolean {
        return this._cells[type] != undefined;
    }

    public addCell(args: AddCellArgs) {
        args.element.style.gridRow = `${args.row} / span ${args.rowSpan ? args.rowSpan : 1}`;
        args.element.style.msGridRow = `${args.row} / span ${args.rowSpan ? args.rowSpan : 1}`;
        args.element.style.gridColumn = `${args.column} / span ${args.columnSpan ? args.columnSpan : 1}`;
        args.element.style.msGridColumn = `${args.column} / span ${args.columnSpan ? args.columnSpan : 1}`;
        args.element.style.zIndex = "0";
        args.element.style.border = "1px solid #0C6DB3";
        args.element.style.verticalAlign = "center";
        args.element.style.borderRadius="18px";
        if (this._cells[args.type] == undefined) {
            this._cells[args.type] = [];
        }
        this._cells[args.type].push(args.element);
        this._container.appendChild(args.element);
    }

    public showCells(type: ViewType): boolean {
        if (this._cells[type] != undefined) {
            for (let i = 0; i < this._cells[type].length; i++) {
                this._cells[type][i].style.display = "initial";
            }
            return true;
        }
        return false;
    }

    public hideCells(type: ViewType): boolean {
        if (this._cells[type] != undefined) {
            for (let i = 0; i < this._cells[type].length; i++) {
                this._cells[type][i].style.display = "none";
            }
            return true;
        }
        return false;
    }
}