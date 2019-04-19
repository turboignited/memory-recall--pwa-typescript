import { Point } from "../utils/point";

export interface RenderingArgs {
    context: CanvasRenderingContext2D;
}
export interface RenderingStrokeArgs extends RenderingArgs {
    strokeColour: string;
    strokeWidth: number
}
export interface RenderTickArgs extends RenderingStrokeArgs {
    position: Point;
    size: number;
}
export interface RenderCrossArgs extends RenderingStrokeArgs {
    position: Point;
    size: number;
}
export interface RenderLineArgs extends RenderingStrokeArgs {
    from: Point;
    to: Point;
    offset: number;
}
export interface RenderGridArgs extends RenderingStrokeArgs {
    columnOffset?: number;
    columns: number;
    rowOffset?: number;
    rows: number;
    cellSize: number;
}
export interface RenderProgressBarArgs extends RenderingArgs {
    x: number;
    y: number;
    width: number;
    height: number;
    outerFillColour: string;
    innerFillColour: string;
    percent: number;
}
export class Rendering {

    public static renderTickAt(args: RenderTickArgs): void {
        args.context.strokeStyle = args.strokeColour;
        args.context.lineWidth = args.strokeWidth;
        args.context.beginPath();
        args.context.moveTo(args.position.x, args.position.y + args.size * 0.5);
        args.context.lineTo(args.position.x + args.size * 0.5, args.position.y + args.size);
        args.context.lineTo(args.position.x + args.size, args.position.y);
        args.context.stroke();
    }

    public static renderCrossAt(args: RenderCrossArgs): void {
        args.context.strokeStyle = args.strokeColour;
        args.context.lineWidth = args.strokeWidth;
        args.context.beginPath();
        args.context.moveTo(args.position.x, args.position.y);
        args.context.lineTo(args.position.x + args.size, args.position.y + args.size);
        args.context.moveTo(args.position.x + args.size, args.position.y);
        args.context.lineTo(args.position.x, args.position.y + args.size);
        args.context.stroke();
    }

    public static renderLine(args: RenderLineArgs): void {
        args.context.strokeStyle = args.strokeColour;
        args.context.lineWidth = args.strokeWidth;
        args.context.beginPath();
        args.context.moveTo(args.from.x + args.offset, args.from.y + args.offset);
        args.context.lineTo(args.to.x + args.offset, args.to.y + args.offset);
        args.context.stroke();
    }

    public static renderGrid(args: RenderGridArgs): void {
        args.context.strokeStyle = args.strokeColour;
        args.context.lineWidth = args.strokeWidth;
        for (let x = args.columnOffset ? args.columnOffset : 0; x < args.columns; x++) {
            for (let y = args.rowOffset ? args.rowOffset : 0; y < args.rows; y++) {
                args.context.strokeRect(
                    x * args.cellSize,
                    y * args.cellSize,
                    args.cellSize,
                    args.cellSize);
            }
        }
    }

    public static renderProgressBar(args: RenderProgressBarArgs): void {
        args.context.fillStyle = args.outerFillColour;
        args.context.fillRect(args.x, args.y, args.width, args.height);
        args.context.fillStyle = args.innerFillColour;
        args.context.fillRect(args.x + 20, args.y + 20, (args.width - 20) * args.percent, args.height - 20);
        args.context.fillStyle = "black";
        args.context.font = "50px serif";
        args.context.textAlign = "center";
        args.context.fillText(`${(args.percent * 100).toFixed(2)}%`, args.width * 0.5, args.height * 0.5, args.width);
    }
}
