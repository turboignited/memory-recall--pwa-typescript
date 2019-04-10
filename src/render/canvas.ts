/**
 * Provides a 2d canvas context with ability to set scale/dimensions
 */
export class Canvas {
    private _context: CanvasRenderingContext2D;
    public get context(): CanvasRenderingContext2D {
        return this._context;
    }
    public get canvas(): HTMLCanvasElement {
        return this._context.canvas;
    }

    constructor(context: CanvasRenderingContext2D) {
        this._context = context;
    }
}