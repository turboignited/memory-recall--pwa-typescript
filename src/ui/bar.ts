import { DivComponent } from "./components";
import { Size } from "../utils/size";

export interface IBarAddCellArgs {
    element: HTMLElement;
    column: number;
    columnSpan?: number;
}
export interface IBarConstructorArgs {
    size: Size;
}

export class Bar {
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
    constructor(args: IBarConstructorArgs) {
        const element = DivComponent();
        const c = args.size.width / args.size.gcd;
        const r = 1;
        element.style.display = "none";
        element.style.width = `${args.size.width}px`;
        element.style.height = `${args.size.height}px`;
        element.style.gridTemplateColumns = element.style.msGridColumns = `repeat(${c}, 1fr)`;
        element.style.gridTemplateRows = element.style.msGridRows = `repeat(${r}, 1fr)`;
        // element.style.backgroundColor = Colours.Primary;
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

    public addCell(args: IBarAddCellArgs): void {
        if (args.columnSpan) {
            args.element.style.gridColumn = args.element.style.msGridColumn = `${args.column} / span ${args.columnSpan}`;
            args.element.style.width = `${this._gcd * args.columnSpan}px`;
        } else {
            args.element.style.gridColumn = args.element.style.msGridColumn = `${args.column}`;
            args.element.style.width = `${this._gcd}px`;
        }
        args.element.style.height = `${this._gcd}px`;

        args.element.style.gridRow = args.element.style.msGridRow = "1";
        this._element.appendChild(args.element);
    }
}