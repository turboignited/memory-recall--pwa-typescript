import { SpriteTypes } from "../assets/sprite_types";

export interface Selection {
    element: HTMLElement;
    title: string
}

export declare type SelectionCallback = (index: number) => void;
export class Selector {
    private _leftButton: HTMLButtonElement;
    private _rightButton: HTMLButtonElement;
    private _titleHeading: HTMLHeadElement;
    private _selectionContainer: HTMLDivElement;
    private _selections: Selection[];
    private _selected: number = 0;
    private _callback: SelectionCallback;
    public get leftButton(): HTMLButtonElement {
        return this._leftButton;
    }

    public get rightButton(): HTMLButtonElement {
        return this._rightButton;
    }
    public get titleHeading(): HTMLHeadElement {
        return this._titleHeading;
    }
    public get selectionContainer(): HTMLDivElement {
        return this._selectionContainer;
    }

    public get selected(): number {
        return this._selected;
    }

    public get selections(): Selection[] {
        return this._selections;
    }

    public get callback(): SelectionCallback {
        return this._callback;
    }

    constructor(selections: Selection[], callback: SelectionCallback, selected: number = 0) {
        const leftButton = document.createElement("button");
        const rightButton = document.createElement("button");
        const selectionContainer = document.createElement("div");
        const titleHeading = document.createElement("h3");

        leftButton.innerText = "<";
        rightButton.innerText = ">";
        leftButton.onclick = () => {
            this.selectPrevious();
        }
        rightButton.onclick = () => {
            this.selectNext();
        }
        this._leftButton = leftButton;
        this._rightButton = rightButton;
        this._selectionContainer = selectionContainer;
        this._selections = selections;
        this._titleHeading = titleHeading;
        this._callback = callback;
        this.select(selected);
    }

    public selectPrevious(): void {
        if (this._selected - 1 >= 0) {
            this._selected--;
        } else {
            this._selected = this._selections.length - 1;
        }

        this.select(this._selected);
    }

    public selectNext(): void {
        if (this._selected + 1 < this._selections.length) {
            this._selected++;
        } else {
            this._selected = 0;
        }

        this.select(this._selected);
    }

    public select(index: number): void {
        if (index > this._selections.length - 1) {
            return;
        }
        const selection = this._selections[index];

        this._titleHeading.innerText = selection.title;
        if (this._selectionContainer.firstChild != null) {
            this._selectionContainer.replaceChild(selection.element, this._selectionContainer.firstChild);
        } else {
            this._selectionContainer.appendChild(selection.element);
        }
        this._callback(index);
    }
}