export const DefaultStyles = (element: HTMLElement): HTMLElement => {
    element.style.margin = "0";
    element.style.textAlign = "center";
    element.style.padding = "0";
    return element;
}

export const createElement = (tag: string): HTMLElement => {
    const element = document.createElement(tag);
    return DefaultStyles(element);
}

export const CheckboxComponent = (checked: boolean = false, onchange: Function): HTMLInputElement => {
    const input = createElement("input") as HTMLInputElement;
    input.type = "checkbox";
    input.checked = checked;
    input.style.alignSelf = "center";
    input.style.width = "100%";
    input.onchange = () => { onchange() };
    return input;
}
export const CanvasComponent = (): HTMLCanvasElement => {
    const canvas = createElement("canvas") as HTMLCanvasElement;
    return canvas;
}
export const ButtonComponent = (text: string, onclick: Function): HTMLButtonElement => {
    const button = createElement("button") as HTMLButtonElement;
    button.innerText = text;

    button.style.borderRadius = "8px";
    button.style.boxShadow="0 0 8px #141ECC";
    button.style.backgroundColor = "#4CCC14";
    // button.style.backgroundColor="#141ECC";
    // button.style.backgroundColor="#CC1814";
    button.onclick = () => { onclick() };
    return button;
}

export const ParagraphComponent = (text: string): HTMLParagraphElement => {
    const p = createElement("p") as HTMLParagraphElement;
    p.innerText = text;
    return p;
}

export const Heading1Component = (text: string): HTMLHeadingElement => {
    const h1 = createElement("h1") as HTMLHeadingElement;
    h1.innerText = text;
    return h1;
}

export const Heading2Component = (text: string): HTMLHeadingElement => {
    const h2 = createElement("h2") as HTMLHeadingElement;
    h2.innerText = text;
    return h2;
}

export const Heading3Component = (text: string): HTMLHeadingElement => {
    const h3 = createElement("h3") as HTMLHeadingElement;
    h3.innerText = text;
    return h3;
}

export const AnchorComponent = (href: string, text: string): HTMLAnchorElement => {
    const a = createElement("a") as HTMLAnchorElement;
    a.href = href;
    a.innerText = text;
    return a;
}

export const ImageComponent = (src: string): HTMLImageElement => {
    const img = createElement("img") as HTMLImageElement;
    img.style.height = "auto";
    img.style.width = "100%";

    img.src = src;
    return img;
}

export const ContainerComponent = (): HTMLDivElement => {
    const div = createElement("div") as HTMLDivElement;
    div.style.width = "100%"
    div.style.height = "100%"
    div.style.borderRadius = "8px";
    div.style.boxShadow="0 0 8px #141ECC";
    div.style.backgroundColor = "#141ECC11";
    // button.style.backgroundColor="#141ECC";
    // button.style.backgroundColor="#CC1814";
    return div;
}

export const TableComponent = (): HTMLTableElement => {
    const table = createElement("table") as HTMLTableElement;
    table.style.width = "100%";
    table.style.overflowY = "scroll"
    table.style.borderCollapse = "collapse";
    return table;
}
