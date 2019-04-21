import { Colours } from "../utils/colours";

export const DefaultStyles = (element: HTMLElement): HTMLElement => {
    element.style.margin = "0";
    element.style.padding = "0";
    return element;
}

export const createElement = (tag: string): HTMLElement => {
    const element = document.createElement(tag);
    return DefaultStyles(element);
}

export const CheckboxComponent = (checked: boolean = false, ariaLabel: string, onchange: Function): HTMLInputElement => {
    const input = createElement("input") as HTMLInputElement;
    input.type = "checkbox";
    input.checked = checked;

    input.style.alignSelf = "center";
    input.style.justifySelf = "center";
    // input.style.width = "40px";
    // input.style.height = "40px";

    input.setAttribute("aria-label", ariaLabel);
    input.onchange = () => {
        input.style.border = "green";
        input.style.backgroundColor = "red";
        onchange()
    };
    return input;
}
export const CanvasComponent = (): HTMLCanvasElement => {
    const canvas = createElement("canvas") as HTMLCanvasElement;
    canvas.appendChild(ParagraphComponent("Canvas is unavailable"));
    return canvas;
}
export const ButtonComponent = (text: string, color: Colours, onclick: Function): HTMLButtonElement => {
    const button = createElement("button") as HTMLButtonElement;
    button.innerText = text;
    button.style.border = "none";
    button.style.borderRadius = "18px";
    button.style.backgroundColor = color;
    button.style.boxShadow = `0 0 8px ${Colours.PrimaryLight}`;
    button.onclick = () => { onclick() };
    return button;
}

export const ParagraphComponent = (text: string): HTMLParagraphElement => {
    const p = createElement("p") as HTMLParagraphElement;
    p.innerText = text;
    p.style.alignSelf = "center";
    p.style.color = Colours.Yellow;
    return p;
}

export const Heading1Component = (text: string): HTMLHeadingElement => {
    const h1 = createElement("h1") as HTMLHeadingElement;
    h1.innerText = text;
    h1.style.alignSelf = "center";
    h1.style.color = Colours.Yellow;

    return h1;
}

export const Heading2Component = (text: string): HTMLHeadingElement => {
    const h2 = createElement("h2") as HTMLHeadingElement;
    h2.innerText = text;
    h2.style.alignSelf = "center";
    h2.style.color = Colours.Yellow;

    return h2;
}

export const Heading3Component = (text: string): HTMLHeadingElement => {
    const h3 = createElement("h3") as HTMLHeadingElement;
    h3.innerText = text;
    h3.style.alignSelf = "center";
    h3.style.color = Colours.Yellow;

    return h3;
}

export const AnchorComponent = (href: string, text: string): HTMLAnchorElement => {
    const a = createElement("a") as HTMLAnchorElement;
    a.href = href;
    a.style.color = Colours.PrimaryLight;
    a.innerText = text;
    return a;
}

export interface ImageComponentArgs {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    onerror?: Function;
    onload?: Function;
}

export const ImageComponent = (args: ImageComponentArgs): HTMLImageElement => {
    const img = createElement("img") as HTMLImageElement;
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
    if (args.width != undefined && args.height != undefined) {
        img.style.width = `${args.width}px`;
        img.style.height = `${args.height}px`;
    }
    else {
        img.style.height = "auto";
        img.style.width = "100%";
    }
    img.src = args.src;
    img.alt = args.alt;
    return img;
}

export const ContainerComponent = (): HTMLDivElement => {
    const div = createElement("div") as HTMLDivElement;
    div.style.borderRadius = "18px";
    return div;
}

export const TableComponent = (): HTMLTableElement => {
    const table = createElement("table") as HTMLTableElement;
    table.style.borderCollapse = "collapse";
    return table;
}
