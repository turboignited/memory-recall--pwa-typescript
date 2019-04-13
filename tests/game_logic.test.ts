import { GameLogic } from "../src/game/game_logic";
import { Sprite } from "../src/assets/sprite";
import { Point } from "../src/utils/point";

const createGameLogicAndInitialize = (cellSize: number, columns: number, rows: number): GameLogic => {
    const logic: GameLogic = new GameLogic({
        cellSize: cellSize,
        columns: columns,
        rows: rows
    });
    const sprites: Sprite[] = [];
    for (let i = 0; i < columns * rows; i++) {
        sprites.push(new Sprite(document.createElement("img"), new Point(-100, -100)));
    }
    expect(logic.initialize(sprites)).toBeTruthy();
    return logic;
}

describe("initialize", () => {
    test("should create activeSprites equal to length of those passed in.", () => {
        const logic: GameLogic = createGameLogicAndInitialize(80, 2, 2);
        expect(logic.initialize([
            new Sprite(document.createElement("img"), new Point(-100, -100)),
            new Sprite(document.createElement("img"), new Point(-100, -100)),
            new Sprite(document.createElement("img"), new Point(-100, -100)),
            new Sprite(document.createElement("img"), new Point(-100, -100))])).toBeTruthy();
        expect(logic.activeSprites.length).toEqual(4);
    });
    test("should set positions of activeSprites to fit within passed in args", () => {
        const logic: GameLogic = createGameLogicAndInitialize(80, 2, 2);
        for (let i = 0; i < logic.activeSprites.length; i++) {
            expect(logic.activeSprites[i].position.x).toBeLessThan(80 * 2);
            expect(logic.activeSprites[i].position.x).toBeGreaterThanOrEqual(0);
            expect(logic.activeSprites[i].position.y).toBeLessThan(80 * 2);
            expect(logic.activeSprites[i].position.y).toBeGreaterThanOrEqual(0);
        }
    });
    test("should set positions of activeSprites to be unique", () => {
        const logic: GameLogic = new GameLogic({
            cellSize: 80,
            columns: 8,
            rows: 8
        });
        const amount: number = 20;
        const sprites: Sprite[] = [];
        for (let i = 0; i < amount; i++) {
            sprites.push(new Sprite(document.createElement("img"), new Point(-100, -100)));
        }
        expect(logic.initialize(sprites)).toBeTruthy();
        let positions: Point[] = [];
        for (let i = 0; i < logic.activeSprites.length; i++) {
            positions.push(logic.activeSprites[i].position);
        }
        let found = 0;
        positions.forEach((pos: Point) => {
            for (let i = 0; i < positions.length; i++) {
                if (positions[i].x == pos.x && positions[i].y == pos.y) {
                    found++;
                }
            }
            expect(found).toEqual(1);
            found = 0;
        });
    });
    test("should return false when sprites passed in exceed the dimensions passed in, true otherwise", () => {
        const logic: GameLogic = new GameLogic({
            cellSize: 80,
            columns: 2,
            rows: 2
        });
        const sprites: Sprite[] = [];
        for (let i = 0; i < 5; i++) {
            sprites.push(new Sprite(document.createElement("img"), new Point(-100, -100)));
        }
        expect(logic.initialize(sprites)).toBeFalsy();
        sprites.pop();
        expect(logic.initialize(sprites)).toBeTruthy();
    });
    test("should set positions of activeSprites to a multiple of cellSize passed in", () => {
        const logic: GameLogic = new GameLogic({
            cellSize: 80,
            columns: 2,
            rows: 2
        });
        const sprites: Sprite[] = [];
        for (let i = 0; i < 4; i++) {
            sprites.push(new Sprite(document.createElement("img"), new Point(-100, -100)));
        }
        expect(logic.initialize(sprites)).toBeTruthy();
        logic.activeSprites.forEach((sprite: Sprite) => {
            expect(sprite.position.x % 80).toEqual(0);
            expect(sprite.position.y % 80).toEqual(0);
        });
    });
});

describe("revealNextSprite",()=>{



});