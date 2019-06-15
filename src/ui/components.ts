import { Colours } from "../utils/colours";

const enum Tags {
    heading1 = "h1",
    heading2 = "h2",
    heading3 = "h3",
    input = "input",
    button = "button",
    table = "table",
    canvas = "canvas",
    anchor = "a",
    paragraph = "p",
    image = "img",
    div = "div"
}
export const enum Components {
    checkbox,
    canvas,
    button,
    paragraph,
    heading1,
    heading2,
    heading3,
    anchor,
    image,
    div,
    table,
    length
}
const letters = '0123456789ABCDEF';

const randomColour = (): string => {
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
const defaultStyles = (element: HTMLElement): HTMLElement => {
    element.style.margin = "0";
    element.style.padding = "0";
    // element.style.border = "1px solid black";
    return element;
}

const createElement = (tag: Tags): HTMLElement => {
    const element = document.createElement(tag);
    return defaultStyles(element);
}
export interface ICheckboxComponentArgs {
    checked: boolean;
    ariaLabel: string;
    onChange: Function;
}
export const CheckboxComponent = (args: ICheckboxComponentArgs): HTMLInputElement => {
    const input = createElement(Tags.input) as HTMLInputElement;
    input.type = "checkbox";
    input.checked = args.checked;
    // input.style.alignSelf = "center";
    // input.style.justifySelf = "center";
    input.setAttribute("aria-label", args.ariaLabel);
    input.onchange = () => {
        input.style.border = "green";
        input.style.backgroundColor = "red";
        args.onChange();
    };
    return input;
}
export const CanvasComponent = (): HTMLCanvasElement => {
    const canvas = createElement(Tags.canvas) as HTMLCanvasElement;
    canvas.appendChild(ParagraphComponent({ text: "Canvas is unavailable" }));
    return canvas;
}

export interface IButtonComponentArgs {
    child: HTMLElement;
    colour: Colours;
    onClick: Function;
}
export const ButtonComponent = (args: IButtonComponentArgs): HTMLButtonElement => {
    const button = createElement(Tags.button) as HTMLButtonElement;
    button.appendChild(args.child);
    button.onclick = () => { args.onClick() };
    return button;
}

export interface IButtonImageComponentArgs {
    image: HTMLImageElement;
    onClick: Function;
}
export const ButtonImageComponent = (args: IButtonImageComponentArgs): HTMLButtonElement => {
    const button = createElement(Tags.button) as HTMLButtonElement;
    button.appendChild(args.image);
    button.style.border = "none";
    button.style.paddingBottom = "2px";
    button.style.paddingRight = "2px";
    args.image.style.background = `linear-gradient(180deg,${Colours.Primary},${Colours.PrimaryLight})`;
    args.image.style.borderRadius = "16px";
    args.image.style.boxShadow = `2px 2px 4px ${Colours.Primary}`;
    

    button.style.background = "none";
    button.onclick = () => { args.onClick() };
    return button;
}

export interface IParagraphComponentArgs {
    text: string;
}
export const ParagraphComponent = (args: IParagraphComponentArgs): HTMLParagraphElement => {
    const p = createElement(Tags.paragraph) as HTMLParagraphElement;
    p.innerText = args.text;
    p.style.color = Colours.Yellow;
    return p;
}

export interface IHeadingComponentArgs {
    text: string;
}
export const Heading1Component = (args: IHeadingComponentArgs): HTMLHeadingElement => {
    const h1 = createElement(Tags.heading1) as HTMLHeadingElement;
    h1.innerText = args.text;
    h1.style.color = Colours.Yellow;

    return h1;
}

export const Heading2Component = (args: IHeadingComponentArgs): HTMLHeadingElement => {
    const h2 = createElement(Tags.heading2) as HTMLHeadingElement;
    h2.innerText = args.text;
    h2.style.color = Colours.Accent;

    return h2;
}

export const Heading3Component = (args: IHeadingComponentArgs): HTMLHeadingElement => {
    const h3 = createElement(Tags.heading3) as HTMLHeadingElement;
    h3.innerText = args.text;
    h3.style.color = Colours.Yellow;

    return h3;
}

export interface IAnchorComponentArgs {
    href: string;
    text: string;
    color: Colours;
}
export const AnchorComponent = (args: IAnchorComponentArgs): HTMLAnchorElement => {
    const a = createElement(Tags.anchor) as HTMLAnchorElement;
    a.href = args.href;
    a.style.color = args.color;
    a.innerText = args.text;
    return a;
}

export interface IImageComponentArgs {
    src: string;
    alt: string;
    onerror?: Function;
    onload?: Function;
}

/**
 * Creates an image with 100% width and height. So is expected to fit within a container element.
 * Will call necessary callbacks for loading and error handling.
 * @param args 
 */
export const ImageComponent = (args: IImageComponentArgs): HTMLImageElement => {
    const img = createElement(Tags.image) as HTMLImageElement;
    if (args.onload != undefined) {
        img.onload = (ev: any) => {
            img.onerror = null;
            img.onload = null;
            if (args.onload != undefined) {
                args.onload();
            }
        }
    }
    if (args.onerror != undefined) {
        img.onerror = (ev: any) => {
            img.onerror = null;
            img.onload = null;
            if (args.onerror != undefined) {
                args.onerror();
            }
        }
    }
    img.style.width = "100%";
    img.style.height = "100%";
    img.src = args.src;
    img.alt = args.alt;
    return img;
}

export const DivComponent = (): HTMLDivElement => {
    const div = createElement(Tags.div) as HTMLDivElement;
    return div;
}

export const TableComponent = (): HTMLTableElement => {
    const table = createElement(Tags.table) as HTMLTableElement;
    table.style.borderCollapse = "collapse";
    return table;
}
