import { Table } from "../src/ui/table";
import { ParagraphComponent } from "../src/ui/components";


const getRandomHTMLElement = (text?: string) => {
    return ParagraphComponent(text ? text : Math.random().toString());
}

const createTable = (heading1?: string, heading2?: string): Table => {
    return new Table({
        headings: [getRandomHTMLElement(heading1), getRandomHTMLElement(heading2)]
    });
}


describe("construction", () => {
    test("should insert a new row with cell headings", () => {
        const table = createTable();
        const row = table.getRow(0);
        expect(row).not.toBeUndefined();
        if (row != undefined) {
            expect(row.children.length).toEqual(2);
            expect(row.children[0]).toBeInstanceOf(HTMLTableCellElement);
            expect(row.children[1]).toBeInstanceOf(HTMLTableCellElement);
        }
    });
});

describe("getRow", () => {
    const table = createTable();

    test("should return a row if it exists", () => {
        const row = table.getRow(0);
        expect(row).not.toBeUndefined();

    });
    test("should return undefined if row does not exist", () => {
        const row = table.getRow(1);
        expect(row).toBeUndefined();
    });

    test("should return undefined when called with a negative value", () => {
        const row = table.getRow(-1);
        expect(row).toBeUndefined();
    });
});

describe("getCell", () => {
    test("should return 1st cell on 1st row", () => {
        const table = createTable();
        const cell = table.getCell(0, 0);
        expect(cell).not.toBeUndefined();
    });
    test("should return last cell on 1st row", () => {
        const table = createTable();
        const cell = table.getCell(0, 1);
        expect(cell).not.toBeUndefined();
    });

    test("should return undefined for a cell on 1st row that exceed it's columns", () => {
        const table = createTable();
        const cell = table.getCell(0, 3);
        expect(cell).toBeUndefined();
    });

    test("should return undefined for a cell on exceeded row", () => {
        const table = createTable();
        const cell = table.getCell(1, 0);
        expect(cell).toBeUndefined();
    });
});

describe("editCell", () => {
    test("should return cell with new html element", () => {
        const table = createTable("One", "Two");
        const existing = table.getCell(0, 0);
        expect(existing).not.toBeUndefined();
        if (existing != undefined) {
            expect(existing.firstChild).not.toBeNull();
            if (existing.firstChild != null) {
                expect(existing.firstChild).toBeInstanceOf(HTMLParagraphElement);
            }
        }
        const replaced = table.editCell(0, 0, getRandomHTMLElement("Replacement"));
        expect(replaced).not.toBeUndefined();
        if (replaced != undefined) {
            expect(replaced.firstChild).not.toBeNull();
            if (replaced.firstChild != null) {
                expect((replaced.firstChild as HTMLParagraphElement).innerText).toEqual("Replacement");
            }
        }
        const final = table.getCell(0, 0);
        expect(final).not.toBeUndefined();
        if (final != undefined) {
            expect(final.firstChild).not.toBeNull();
            if (final.firstChild != null) {
                expect((final.firstChild as HTMLParagraphElement).innerText).toEqual("Replacement");
            }
        }
    });

    test("should return undefined when editing a non existent cell", () => {
        const table = createTable();
        expect(table.editCell(0, 10, getRandomHTMLElement())).toBeUndefined();
        expect(table.editCell(-10, 0, getRandomHTMLElement())).toBeUndefined();
    });
});

describe("addRow", () => {
    test("should insert new row below top heading", () => {
        const table = createTable();
        const row = table.addRow([getRandomHTMLElement(), getRandomHTMLElement()]);
        expect(row).not.toBeUndefined();
        if (row != undefined) {
            expect(row.children.length).toEqual(2);
            expect(row.children[0]).toBeInstanceOf(HTMLTableCellElement);
            expect(row.children[1]).toBeInstanceOf(HTMLTableCellElement);
        }
    });
    test("should return undefined when passed in arguments exceed columns", () => {
        const table = createTable();
        const row = table.addRow([getRandomHTMLElement(), getRandomHTMLElement(), getRandomHTMLElement()]);
        expect(row).toBeUndefined();
    });
});

describe("addCell", () => {
    test("should return new cell on first row", () => {
        const table = createTable();
        const cell = table.addCell(0, getRandomHTMLElement());
        expect(cell).not.toBeUndefined();
        expect(cell).toBeInstanceOf(HTMLTableCellElement);
    });
    test("should add cell onto end of first row", () => {
        const table = createTable();
        const cell = table.addCell(0, getRandomHTMLElement());
        const row = table.getRow(0);
        if (row != undefined) {
            expect(row.children.length).toEqual(3);
            expect(row.children[row.children.length - 1]).toEqual(cell);
        }
    });
    test("should return undefined when attempting to add cell on not existent row", () => {
        const table = createTable();
        const cell = table.addCell(1, getRandomHTMLElement());
        const row = table.getRow(1);
        expect(row).toBeUndefined();
        expect(cell).toBeUndefined();
    });
});

describe("deleteRow", () => {
    test("should return true when deleting 1st row", () => {
        const table = createTable();
        expect(table.tableElement.rows.length).toEqual(1);
        expect(table.deleteRow(0)).toBeTruthy();
        expect(table.tableElement.rows.length).toEqual(0);
    });
    test("should return false when deleting out of bounds row", () => {
        const table = createTable();
        expect(table.tableElement.rows.length).toEqual(1);
        expect(table.deleteRow(1)).toBeFalsy();
        expect(table.tableElement.rows.length).toEqual(1);
    });
});

describe("highlightRow", () => {
    test("should set background colour of 1st row to yellow", () => {
        const table = createTable();
        expect(table.highlightRow(0, "yellow")).toBeTruthy();
        expect(table.tableElement.rows[0].style.backgroundColor).toEqual("yellow");
    });

    test("should remove background colour of 1st row if called twice on same row", () => {
        const table = createTable();
        expect(table.highlightRow(0, "yellow")).toBeTruthy();
        expect(table.tableElement.rows[0].style.backgroundColor).toEqual("yellow");
        expect(table.highlightRow(0, "yellow")).toBeTruthy();
        expect(table.tableElement.rows[0].style.backgroundColor).toEqual("");
    });
});