import { Layout } from "./layout";

export interface GridLayoutAddArgs {
    element: HTMLElement;
    column: number;
    row: number;
    columnSpan?: number;
    rowSpan?: number;
}

export class GridLayout extends Layout {

    constructor() {
        super("grid");
        this.element.style.gridTemplateColumns = `repeat(${9}, 1fr)`;
        this.element.style.msGridColumns = `repeat(${9}, 1fr)`;

        this.element.style.gridTemplateRows = `repeat(${16}, 1fr)`;
        this.element.style.msGridRows = `repeat(${16}, 1fr)`;
    }

    public add(args: GridLayoutAddArgs): void {
        args.element.style.gridColumn = `${args.column} / span ${args.columnSpan ? args.columnSpan : 1}`;
        args.element.style.msGridColumn = `${args.column} / span ${args.columnSpan ? args.columnSpan : 1}`;

        args.element.style.gridRow = `${args.row} / span ${args.rowSpan ? args.rowSpan : 1}`;
        args.element.style.msGridRow = `${args.row} / span ${args.rowSpan ? args.rowSpan : 1}`;
        this.element.appendChild(args.element);
    }
}