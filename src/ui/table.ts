import { TableComponent } from "./components";
import { Colours } from "../utils/colours";

export interface ITableConstructorArgs {
    headings: HTMLElement[];
}

export class Table {
    private _tableElement: HTMLTableElement;
    private _highlightedRow: number | undefined;
    public get tableElement(): HTMLTableElement {
        return this._tableElement;
    }
    public get highlightedRow(): number | undefined {
        return this._highlightedRow;
    }

    constructor(args: ITableConstructorArgs) {
        const table = TableComponent();
        const row = table.insertRow();
        for (let i = 0; i < args.headings.length; i++) {
            const cell = row.insertCell(i);
            cell.style.backgroundColor = Colours.Primary;
            cell.style.border = `2px solid ${Colours.PrimaryLight}`;
            cell.appendChild(args.headings[i]);
        }
        this._tableElement = table;
    }

    public addRow(cells: HTMLElement[]): HTMLTableRowElement | undefined {
        if (cells.length > 0) {
            const newRow = this._tableElement.insertRow();
            for (let i = 0; i < cells.length; i++) {
                const cell = newRow.insertCell(i);
                cell.style.border = `2px solid ${Colours.PrimaryLight}`;
                cell.appendChild(cells[i]);
            }
            return newRow;
        }
        return undefined;
    }

    public addOrReplaceRow(index: number, cells: HTMLElement[]): HTMLTableRowElement | undefined {
        const row = this.getRow(index);
        if (row != undefined && row.cells.length == row.cells.length) {
            for (let i = 0; i < row.cells.length; i++) {
                const child = row.cells[i].firstChild;
                if (child != null) {
                    child.replaceWith(cells[i]);
                }
            }
        } else {
            this.addRow(cells);
        }
        return undefined;
    }

    public addCell(row: number, cell: HTMLElement): HTMLTableCellElement | undefined {
        if (row >= 0 && row < this._tableElement.rows.length) {
            const existingRow = this._tableElement.rows[row];
            const newCell = existingRow.insertCell(existingRow.children.length);
            newCell.style.border = `2px solid ${Colours.PrimaryLight}`;
            newCell.appendChild(cell);
            return newCell;
        }
        return undefined;
    }

    public getRow(index: number): HTMLTableRowElement | undefined {
        if (index >= 0 && index < this._tableElement.rows.length) {
            return this._tableElement.rows[index];
        }
        return undefined;
    }

    public getCell(row: number, column: number): HTMLTableCellElement | undefined {
        const cellRow = this.getRow(row);
        if (cellRow != undefined) {
            return cellRow.cells[column];
        }
        return undefined;
    }


    public editCell(row: number, column: number, cell: HTMLElement): HTMLTableCellElement | undefined {
        const existingCell = this.getCell(row, column);
        if (existingCell != undefined && existingCell.firstChild != null) {
            existingCell.replaceChild(cell, existingCell.firstChild);
            return existingCell;
        }
        return undefined;
    }

    public deleteRow(row: number): boolean {
        if (row >= 0 && row < this._tableElement.rows.length) {
            if (row == this._highlightedRow) {
                this._highlightedRow = undefined;
                this.unhighlightRow(row);
            }
            this._tableElement.deleteRow(row);
            return true;
        }
        return false;
    }

    public highlightRow(row: number, colour: string): boolean {
        if (row >= 0 && row < this._tableElement.rows.length) {
            if (row == this._highlightedRow) {
                return false;
            } else if (this._highlightedRow != undefined && this._tableElement.rows[this._highlightedRow] != undefined) {
                this._tableElement.rows[this._highlightedRow].style.backgroundColor = "";
            }
            this._tableElement.rows[row].style.backgroundColor = colour;
            this._highlightedRow = row;
            return true;
        }
        return false;
    }
    public unhighlightRow(row: number): boolean {
        if (row >= 0 && row < this._tableElement.rows.length) {
            this._tableElement.rows[row].style.backgroundColor = "";
            return true;
        }
        return false;
    }
}