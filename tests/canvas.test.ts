import { Canvas } from "../src/render/canvas";
import { Dimensions } from "../src/utils/dimensions";


const context = document.createElement("canvas").getContext("2d");

if (context != null) {
    var canvas: Canvas;
    beforeAll(() => {
        canvas = new Canvas(new Dimensions(500, 600, 700, 800), context);
    });

    describe("construction", () => {
        test("should create a CanvasHTMLElement", () => {
            expect(canvas.canvas).toBeInstanceOf(HTMLCanvasElement);
        });
        test("should create a CanvasRenderingContext2D", () => {
            expect(canvas.context).toBeInstanceOf(CanvasRenderingContext2D);

        });
        test("should configure canvas width and height based on scale", () => {
            expect(canvas.canvas.width).toEqual(Math.floor(500 * 800 / 600));
            expect(canvas.canvas.height).toEqual(Math.floor(600 * 800 / 600));
        });
    });

    describe("createCanvasElement", () => {

        test("should return a new HTMLCanvasElement", () => {
            expect(canvas.createCanvasElement()).toBeInstanceOf(HTMLCanvasElement);
        });
        test("should set id of canvas to 'canvas'", () => {
            expect(canvas.createCanvasElement().id).toEqual("canvas");
        });
    });

    describe("setDimensions", () => {
        test("should accept new dimensions and update canvas width and height", () => {
            const dimensions = new Dimensions(500, 700, 1000, 1200);
            canvas.setDimensions(dimensions);
            expect(canvas.canvas.width).toEqual(Math.floor(500 * 1200 / 700));
            expect(canvas.canvas.height).toEqual(Math.floor(700 * 1200 / 700));
        });
    });
}