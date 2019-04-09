import { Point } from "../utils/point";

export class Line {

    public static drawLine(context: CanvasRenderingContext2D, start: Point, end: Point, colour: string) {
        context.strokeStyle= `${colour}`;
        context.lineWidth=20;

        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();



        context.beginPath();
        context.moveTo(end.x,end.y);
        context.arc(end.x,end.y,20,0,Math.PI*2);
        context.fill();
        
    }
}