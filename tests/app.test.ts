import { App } from "../src/app";
import { Canvas } from "../src/render/canvas";
import { ViewType } from "../src/views/view_type";
import { LoadingView } from "../src/views/loading_view";
import { Loader } from "../src/utils/loader";

var app: App;

const createLoader = (): Loader<ViewType> => {
    return new Loader<ViewType>();
}

beforeAll(() => {
    const context = document.createElement("canvas").getContext("2d");
    if (context) {
        app = new App(720, 1280, 1280, 768, context);
    }
});

describe("constructor", () => {
    test("should create a canvas instance", () => {
        expect(app.canvas).toBeInstanceOf(Canvas);
    });
});

describe("load", () => {
    test("should add LoadingView", () => {
        app.load(createLoader());
        expect(app.views.get(ViewType.Load)).toBeInstanceOf(LoadingView);
    });
});

describe("resize", () => {
    test("should update dimensions scale", () => {
        app.resize(1000, 2000);
        expect(app.dimensions.scale).toEqual(1000 / 720);
    });
    test("should update canvas width and height", () => {
        app.resize(1000, 2000);
        expect(app.canvas.canvas.width).toEqual(Math.floor(app.dimensions.width * 1000 / 720));
        expect(app.canvas.canvas.height).toEqual(Math.floor(app.dimensions.height * 1000 / 720));
    });

});

describe("setView", () => {
    test("should set activeview", () => {
        app.load(createLoader());
        app.setView(ViewType.Main);
        expect(app.activeView).toEqual(ViewType.Main);
    });
});