export class LocalStorage {

    public static getValue(key: string): string | null {
        try {
            const value = localStorage.getItem(key);
            return value;
        } catch (e) {
            throw e;
        }
    }

    public static removeKey(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            throw e;
        }
    }

    public static setValue(key: string, value: string): void {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            throw e;
        }
    }
}