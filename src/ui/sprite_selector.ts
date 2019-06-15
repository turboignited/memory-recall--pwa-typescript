import { SpriteTypes } from "../assets/sprite_types";
import { Assets } from "../assets/assets";
import { Selector, ISelection, SelectionCallback } from "./selector";
import { Preferences } from "../storage/preferences";

export interface ISpriteSelectorConstructorArgs {
    selectionCallback: SelectionCallback;
}
export class SpriteSelector extends Selector {

    constructor(args: ISpriteSelectorConstructorArgs) {
        const spriteSelections: ISelection[] = [];
        let titles: string[] = [];
        let elements: HTMLElement[] = [];
        Object.values(SpriteTypes).map((value: string) => {
            const num = parseInt(value);
            if (isNaN(num)) {
                titles.push(value);
            } else {
                elements.push(Assets.sprites.getSprite(num, 1).image);
            }
        });
        for (let i = 0; i < titles.length; i++) {
            spriteSelections.push({
                title: titles[i],
                element: elements[i]
            });
        }

        super({
            callback: args.selectionCallback,
            selected: Preferences.activeSprite,
            selections: spriteSelections
        });
    }
}