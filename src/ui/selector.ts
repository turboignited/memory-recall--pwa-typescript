import { DivComponent, Heading2Component } from "./components";

export interface ISelection {
    element: HTMLElement;
    title: string;
}
export interface ISelectorConstructorArgs {
    selections: ISelection[];
    callback: SelectionCallback;
    selected: number;
}

export declare type SelectionCallback = (index: number) => void;
export class Selector {
    private _titleHeading: HTMLHeadingElement;
    private _selectionContainer: HTMLDivElement;
    private _selections: ISelection[];
    private _selected: number = 0;
    private _callback: SelectionCallback;

    public get titleHeading(): HTMLHeadingElement {
        return this._titleHeading;
    }
    public get selectionContainer(): HTMLDivElement {
        return this._selectionContainer;
    }

    public get selected(): number {
        return this._selected;
    }

    public get selections(): ISelection[] {
        return this._selections;
    }

    public get callback(): SelectionCallback {
        return this._callback;
    }

    constructor(args: ISelectorConstructorArgs) {
        this._selectionContainer = DivComponent();
        this._selections = args.selections;
        this._titleHeading = Heading2Component({ text: "" });
        this._callback = args.callback;
        this.select(args.selected);
    }

    public selectPrevious(): void {
        if (this._selected - 1 >= 0) {
            this.select(this._selected - 1);
        } else {
            if (this._selections.length == 0) {
                return;
            }
            this.select(this._selections.length - 1);
        }

    }

    public selectNext(): void {
        if (this._selected + 1 < this._selections.length) {
            this.select(this._selected + 1);
        } else {
            if (this._selections.length == 0) {
                return;
            }
            this.select(0);
        }
    }

    public select(index: number): void {
        if (index < 0 ||
            this._selections.length == 0 ||
            index >= this._selections.length) {
            return;
        }

        const selection = this._selections[index];

        this._titleHeading.innerText = selection.title;
        if (this._selectionContainer.firstChild != null) {
            this._selectionContainer.replaceChild(selection.element, this._selectionContainer.firstChild);
        } else {
            this._selectionContainer.appendChild(selection.element);
        }

        this._selected = index;

        this._callback(index);
    }
}