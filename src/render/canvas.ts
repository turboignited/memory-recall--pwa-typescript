import { Dimensions } from "../utils/dimensions";

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

    constructor(dimensions: Dimensions, context: CanvasRenderingContext2D) {
        this._context = context;
        this.setDimensions(dimensions);
    }

    public setDimensions(dimensions: Dimensions): void {
        //TODO: Backup before clearing

        this._context.canvas.width = Math.floor(dimensions.width * dimensions.scale);
        this._context.canvas.height = Math.floor(dimensions.height * dimensions.scale);
        this._context.scale(dimensions.scale, dimensions.scale);
    }
}