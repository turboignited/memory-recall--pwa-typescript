import { LocalStorage } from "./local";

export class Preferences {

    private static _termsAccepted: boolean = false;
    public static get termsAccepted(): boolean {
        const accepted = LocalStorage.getValue("termsAndConditions");
        if (accepted != null) {
            if (accepted == "true") {
                return true;
            }
        }
        return false;
    }


    /**
     * Toggle accept/decline
     */
    public static updateTerms(): void {
        if (this.termsAccepted) {
            LocalStorage.setValue("termsAndConditions", "false");
        } else {
            LocalStorage.setValue("termsAndConditions", "true");
        }
    }
}