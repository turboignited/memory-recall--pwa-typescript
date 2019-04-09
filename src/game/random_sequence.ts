export class RandomSequence {
    private _sequence: number[];

    public get sequence(): number[] {
        return this._sequence;
    }

    constructor(size: number, maxValue: number) {
        this._sequence = [];
        this.reset(size, maxValue);
    }

    public shuffle(a: number[]) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    public reset(size: number, max: number): void {
        for (let i = 0; i < size; i++) {
            this._sequence[i] = Math.floor(Math.random() * max);
        }
        this.shuffle(this._sequence);
    }

}