export interface IPointConstructorArgs {
    x: number;
    y: number;
}
export class Point {
    public x: number;
    public y: number;
    constructor(args: IPointConstructorArgs) {
        this.x = args.x;
        this.y = args.y;
    }
}
