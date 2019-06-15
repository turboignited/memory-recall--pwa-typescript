import { Point } from "../utils/point";
import { Colours } from "../utils/colours";

export interface IRenderingArgs {
    context: CanvasRenderingContext2D;
}
export interface IRenderCircleStrokeArgs extends IRenderingArgs {
    progress: number;
    radius: number;
    center: Point;
    strokeColour: Colours;
    strokeWidth: number;
}
export interface IRenderCircleFillArgs extends IRenderingArgs {
    radius: number;
    center: Point;
    fillColour: Colours;
}
export interface IRenderingStrokeArgs extends IRenderingArgs {
    strokeColour: Colours;
    strokeWidth: number
}
export interface IRenderTickArgs extends IRenderingStrokeArgs {
    position: Point;
    size: number;
}
export interface IRenderCrossArgs extends IRenderingStrokeArgs {
    position: Point;
    size: number;
}
export interface IRenderLineArgs extends IRenderingStrokeArgs {
    from: Point;
    to: Point;
    offset: number;
}
export interface IRenderGridArgs extends IRenderingStrokeArgs {
    columnOffset?: number;
    columns: number;
    rowOffset?: number;
    rows: number;
    cellSize: number;
}
export interface IRenderProgressBarArgs extends IRenderingArgs {
    position: Point;
    width: number;
    height: number;
    outerFillColour: Colours;
    innerFillColour: Colours;
    percent: number;
}
export class Rendering {

    public static renderTickAt(args: IRenderTickArgs): void {
        args.context.strokeStyle = args.strokeColour;
        args.context.lineWidth = args.strokeWidth;
        args.context.beginPath();
        args.context.moveTo(args.position.x, args.position.y + args.size * 0.5);
        args.context.lineTo(args.position.x + args.size * 0.5, args.position.y + args.size);
        args.context.lineTo(args.position.x + args.size, args.position.y);
        args.context.stroke();
    }

    public static renderCrossAt(args: IRenderCrossArgs): void {
        args.context.strokeStyle = args.strokeColour;
        args.context.lineWidth = args.strokeWidth;
        args.context.beginPath();
        args.context.moveTo(args.position.x, args.position.y);
        args.context.lineTo(args.position.x + args.size, args.position.y + args.size);
        args.context.moveTo(args.position.x + args.size, args.position.y);
        args.context.lineTo(args.position.x, args.position.y + args.size);
        args.context.stroke();
    }

    public static renderLine(args: IRenderLineArgs): void {
        args.context.strokeStyle = args.strokeColour;
        args.context.lineWidth = args.strokeWidth;
        args.context.beginPath();
        args.context.moveTo(args.from.x + args.offset, args.from.y + args.offset);
        args.context.lineTo(args.to.x + args.offset, args.to.y + args.offset);
        args.context.stroke();
    }

    public static renderGrid(args: IRenderGridArgs): void {
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

    public static renderCircleStroke(args: IRenderCircleStrokeArgs) {
        args.context.strokeStyle = args.strokeColour;
        args.context.lineWidth = args.strokeWidth;
        args.context.beginPath();
        args.context.arc(args.center.x, args.center.y, args.radius, 0, args.progress * 2 * Math.PI);
        args.context.stroke();
    }

    public static renderCircleFill(args: IRenderCircleFillArgs) {
        args.context.fillStyle = args.fillColour;
        args.context.beginPath();
        args.context.arc(args.center.x, args.center.y, args.radius, 0, 2 * Math.PI);
        args.context.fill();
    }

    public static renderProgressBar(args: IRenderProgressBarArgs): void {
        args.context.fillStyle = args.outerFillColour;
        args.context.fillRect(args.position.x, args.position.y, args.width, args.height);
        args.context.fillStyle = args.innerFillColour;
        args.context.fillRect(args.position.x + 10, args.position.y + 10, (args.width - 20) * args.percent, args.height - 20);
    }
}
