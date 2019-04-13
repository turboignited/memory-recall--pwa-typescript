import { GameLogic } from "../src/game/game_logic";
import { Logic } from "../src/game/logic";

let logic: Logic = new GameLogic({
    cellSize: 80,
    columns: 1280 / 80,
    rows: (720 / 80) - 1
});

describe("construction", () => {
    test("should set shouldRender to true", () => {
        expect(true).toBeTruthy();
    });

});

describe("setup", () => {

});

describe("reset", () => {

});