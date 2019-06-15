import { DivComponent } from "./components";
import { Size } from "../utils/size";

export interface IGridAddCellArgs {
    element: HTMLElement;
    row: number;
    column: number;
    rowSpan?: number;
    columnSpan?: number;
}
export interface IGridConstructorArgs {
    size: Size;
}

export class Grid {
    private _element: HTMLDivElement;
    public get element(): HTMLDivElement {
        return this._element;
    }
    private _columns: number;
    private _rows: number;
    private _gcd: number;
    public get gcd(): number {
        return this._gcd;
    }
    public get columns(): number {
        return this._columns;
    }
    public get rows(): number {
        return this._rows;
    }
    constructor(args: IGridConstructorArgs) {
        const element = DivComponent();
        const c = args.size.width / args.size.gcd;
        const r = args.size.height / args.size.gcd;
        element.style.display = "none";
        element.style.width = `${args.size.width}px`;
        element.style.height = `${args.size.height}px`;
        element.style.gridTemplateColumns = element.style.msGridColumns = `repeat(${c}, 1fr)`;
        element.style.gridTemplateRows = element.style.msGridRows = `repeat(${r}, 1fr)`;
        this._element = element;
        this._rows = r;
        this._gcd = args.size.gcd;
        this._columns = c;
    }

    public hide(): boolean {
        if (this._element.style.display === "grid") {
            this._element.style.display = "none";
            return true;
        }
        return false;
    }

    public show(): boolean {
        if (this._element.style.display === "none") {
            this._element.style.display = "grid";
            return true;
        }
        return false;
    }

    /**
     * Will set width and height of cell to fit the columns, rows and spanning attributes,
     * this ensures the cell does not overflow into other cells.
     * As well as setting the necessary column and row attributes to append within this grid.
     * @param args 
     */
    public addCell(args: IGridAddCellArgs): void {
        if (args.rowSpan) {
            args.element.style.gridRow = args.element.style.msGridRow = `${args.row} / span ${args.rowSpan}`;
            args.element.style.height = `${this._gcd * args.rowSpan}px`;
        } else {
            args.element.style.gridRow = args.element.style.msGridRow = `${args.row}`;
            args.element.style.height = `${this._gcd}px`;
        }
        if (args.columnSpan) {
            args.element.style.gridColumn = args.element.style.msGridColumn = `${args.column} / span ${args.columnSpan}`;
            args.element.style.width = `${this._gcd * args.columnSpan}px`;
        } else {
            args.element.style.gridColumn = args.element.style.msGridColumn = `${args.column}`;
            args.element.style.width = `${this._gcd}px`;

        }
        this._element.appendChild(args.element);
    }
}