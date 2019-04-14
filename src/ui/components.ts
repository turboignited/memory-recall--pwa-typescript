

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
    button.style.borderRadius = "18px";
    button.style.backgroundColor="#4CCC14";
    // button.style.backgroundColor="#141ECC";
    // button.style.backgroundColor="#CC1814";
    button.onclick = () => { onclick() };
    return button;
}