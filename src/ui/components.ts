

export const Checkbox = (checked: boolean = false, onchange: Function): HTMLInputElement => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = checked;
    checkbox.onchange = () => { onchange() };
    return checkbox;
}

export const Button = (text: string, onclick: Function): HTMLButtonElement => {
    const button = document.createElement("button");
    button.innerText = text;
    button.style.borderRadius = "4px";
    button.onclick = () => { onclick() };
    return button;
}