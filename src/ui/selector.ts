import { ButtonComponent, ContainerComponent, Heading2Component } from "./components";
import { Colours } from "../utils/colours";

export interface Selection {
    element: HTMLElement;
    title: string
}

export declare type SelectionCallback = (index: number) => void;
export class Selector {
    private _leftButton: HTMLButtonElement;
    private _rightButton: HTMLButtonElement;
    private _titleHeading: HTMLHeadingElement;
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
    public get titleHeading(): HTMLHeadingElement {
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

    constructor(selections: Selection[], callback: SelectionCallback, selected: number) {
        const leftButton = ButtonComponent("<", Colours.Secondary, () => {
            this.selectPrevious();
        });
        const rightButton = ButtonComponent(">", Colours.Secondary, () => {
            this.selectNext();
        });
        this._leftButton = leftButton;
        this._rightButton = rightButton;
        this._selectionContainer = ContainerComponent();
        this._selectionContainer.style.width = "80px";
        this._selectionContainer.style.height = "80px";
        this._selections = selections;
        this._titleHeading = Heading2Component("");
        this._callback = callback;
        this.select(selected);
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
        selection.element.animate([
            { // from
                transform: `scale(0.5)`
            },
            { // to
                transform: `scale(1.2)`
            },
            { // to
                transform: `scale(1.0)`
            }
        ], 200);
        this._selected = index;

        this._callback(index);
    }
}