export class Table {

    private _element: HTMLTableElement;
    public get element(): HTMLTableElement {
        return this._element;
    }

    constructor(headings: string[]) {
        const table = document.createElement("table");

        const row = table.insertRow();
        for (let i = 0; i < headings.length; i++) {
            const heading = document.createElement("th");
            const cell = row.insertCell(i);
            heading.innerText = headings[i];
            // cell.style.width="100%";
            cell.style.textAlign = "left";
            if (i % 2 == 0) {
                cell.style.backgroundColor = "#f2f2f2";
            }
            cell.style.border = "1px solid black"
            cell.appendChild(heading);
        }
        table.style.overflowY = "scroll"
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";
        this._element = table;
    }
}