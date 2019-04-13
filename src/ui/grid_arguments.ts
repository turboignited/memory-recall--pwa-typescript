import { ViewType } from "../views/view_type";

export interface AddCellArgs {
    type: ViewType,
    element: HTMLElement,
    row: number,
    column: number,
    columnSpan?: number,
    rowSpan?: number
}