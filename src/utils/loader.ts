

export declare type LoadProgress<T> = (name: T, status: LoadStatus) => void;
export interface LoadStatus {
    total: number;
    remaining: number;
    error: boolean;
}

export class Loader<T> {
    private _loading: Map<T, LoadStatus>;
    private _progressListener: LoadProgress<T> | undefined;
    private _completedListener: Function | undefined;
    private _errorListener: Function | undefined;
    private _total: number;
    private _loaded: number;
    /**
     * Attach an event listener when progress is made
     */
    public setProgressListener(listener: LoadProgress<T>) {
        this._progressListener = listener;
    }

    public setCompletedListener(listener: Function) {
        this._completedListener = listener;
    }
    public setErrorListener(listener: Function) {
        this._errorListener = listener;
    }

    public get completedListener(): Function | undefined {
        return this._completedListener;
    }

    public get progressListener(): LoadProgress<T> | undefined {
        return this._progressListener;
    }

    public get errorListener(): Function | undefined {
        return this._errorListener;
    }

    public get loading(): Map<T, LoadStatus> {
        return this._loading;
    }

    public get percent(): number {
        return this._loaded / this._total;
    }

    public get total(): number {
        return this._total;
    }

    public get loaded(): number {
        return this._loaded;
    }

    constructor() {
        this._loading = new Map<T, LoadStatus>();
        this._total = 0;
        this._loaded = 0;

    }

    public load(key: T): number {
        if (this._total > 0 && this._loaded < this._total) {
            const loading = this._loading.get(key);
            if (loading != undefined) {
                const remaining = loading.remaining - 1;
                if (remaining >= 0) {
                    const status: LoadStatus = {
                        remaining: remaining,
                        total: loading.total,
                        error: false
                    };
                    this._loading.set(key, status);
                    this._loaded++;
                    this.onProgress(key, status);
                    if (this._loaded == this._total) {
                        this.onCompleted();
                    }
                    return remaining;
                }
            }
        }
        return 0;
    }
    public onProgress(key: T, status: LoadStatus): void {
        if (this._progressListener) {
            this._progressListener(key, status);
        }
    }

    public onCompleted() {
        if (this._completedListener) {
            this._completedListener();
        }
    }

    public onError() {
        if (this._errorListener) {
            this._errorListener();
        }
    }

    public error(key: T): void {
        const loading = this._loading.get(key);
        if (loading != undefined) {
            const status: LoadStatus = {
                remaining: loading.remaining,
                total: loading.total,
                error: true
            };
            this._loading.set(key, status);
            this.onError();
        }
    }

    public add(key: T, total: number): boolean {
        if (!this._loading.has(key)) {
            this._total += total;
            this._loading.set(key, {
                total: total,
                remaining: total,
                error: false
            });
            return true;
        }
        return false;
    }

    public reset(): void {
        this._total = 0;
        this._loaded = 0;
        this._loading.clear();
    }

}