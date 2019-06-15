import { LocalStorage } from "./local";
import { SpriteTypes } from "../assets/sprite_types";

export class Preferences {
    private static readonly _activeSpriteKey: string = "activeSprite";
    private static readonly _termsKey: string = "termsAndConditions";

    public static online: boolean = false;
    /**
     * Terms and Conditions
     */

    public static toggleTermsAndConditions(): void {
        if (this.termsAccepted) {
            LocalStorage.setValue(this._termsKey, "false");
        } else {
            LocalStorage.setValue(this._termsKey, "true");
        }
    }

    public static get termsAccepted(): boolean {
        const accepted = LocalStorage.getValue(this._termsKey);
        if (accepted != null) {
            if (accepted == "true") {
                return true;
            }
        }
        return false;
    }

    /**
     * SpriteTypes
     */

    public static setActiveSprite(type: SpriteTypes): void {
        LocalStorage.setValue(this._activeSpriteKey, type.toString());
    }

    public static get activeSprite(): SpriteTypes {
        const type = LocalStorage.getValue(this._activeSpriteKey);
        if (type != null) {
            const parsed = parseInt(type);
            return parsed;
        }
        return SpriteTypes.Numbers;
    }
}