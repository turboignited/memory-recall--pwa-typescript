import { TableComponent } from "./components";

export class Table {
    private _tableElement: HTMLTableElement;
    private _highlightedRow: number | undefined;
    public get tableElement(): HTMLTableElement {
        return this._tableElement;
    }
    public get highlightedRow(): number | undefined {
        return this._highlightedRow;
    }

    constructor(headings: HTMLElement[]) {
        const table = TableComponent();
        const row = table.insertRow();
        for (let i = 0; i < headings.length; i++) {
            const cell = row.insertCell(i);
            cell.appendChild(headings[i]);
            cell.style.border = "1px solid black"
        }
        this._tableElement = table;
    }

    public addRow(cells: HTMLElement[]): HTMLTableRowElement | undefined {
        if (cells.length > 0 && cells.length <= this._tableElement.rows[0].cells.length) {
            const newRow = this._tableElement.insertRow();
            for (let i = 0; i < cells.length; i++) {
                const cell = newRow.insertCell(i);
                cell.appendChild(cells[i]);
            }
            return newRow;
        }
        return undefined;
    }

    public addCell(row: number, cell: HTMLElement): HTMLTableCellElement | undefined {
        if (row > -1 && row < this._tableElement.rows.length) {
            const existingRow = this._tableElement.rows[row];
            const newCell = existingRow.insertCell(existingRow.children.length);
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
            this._tableElement.deleteRow(row);
            return true;
        }
        return false;
    }

    public highlightRow(row: number, colour: string): boolean {
        if (row >= 0 && row < this._tableElement.rows.length) {
            if (this._tableElement.rows[row].style.backgroundColor !== "") {
                this._tableElement.rows[row].style.backgroundColor = "";
            } else {
                this._tableElement.rows[row].style.backgroundColor = colour;
            }
            return true;
        }
        return false;
    }
}