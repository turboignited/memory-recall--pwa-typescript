import { Dimensions } from "../src/utils/dimensions";



var dimensions: Dimensions;
beforeAll(() => {
    dimensions = new Dimensions({ width: 720, height: 1280, maximumWidth: window.innerWidth, maximumHeight: window.innerHeight });
});

describe("updateScale", () => {
    test("it should update scale based on minimum of both maximum width and height", () => {
        dimensions.updateScale(1000, 2000);
        expect(dimensions.scale).toEqual(1000 / 720);
    });
});

describe("centerPoint", () => {
    test("should return point at center of width and height", () => {
        const point = dimensions.centerPoint();
        expect(point.x).toEqual(720 * 0.5);
        expect(point.y).toEqual(1280 * 0.5);

    });
});