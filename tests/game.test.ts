import { Game } from "../src/game/game";
import { GameState } from "../src/game/game_state";
import { CanvasComponent } from "../src/ui/components";
import { MemoryRecall } from "../src/game/memory_recall";

jest.setTimeout(100000);

const context = CanvasComponent().getContext("2d");

const game: Game = new Game({ logic: new MemoryRecall({ callback: null, cellSize: 80, columns: 8, rows: 8 }) });
/**
     * Called when the game is instantiated
     */
describe("construction-NEW", () => {
    test("should have GameState set to None", () => {
        expect(game.state).toEqual(GameState.None);
    });
})

/**
 * Called when the game is made visible
 */
describe("start", () => {
    test("should have GameState equal to None", () => {
        expect(game.state).toEqual(GameState.None);
    });
    test("should set GameState to Playing", () => {
        expect(game.start()).toBeTruthy();
        expect(game.state).toEqual(GameState.Playing);
    });
    test("should return false if GameState is Playing", () => {
        expect(game.state).toEqual(GameState.Playing);
        expect(game.start()).toBeFalsy();
    });
});


/**
 * Called when game is in the Playing state
 */
describe("pause", () => {
    test("should have GameState equal to Playing", () => {
        expect(game.state).toEqual(GameState.Playing);
    });
    test("should set GameState to Paused", () => {
        expect(game.pause()).toBeTruthy();
        expect(game.state).toEqual(GameState.Paused);
    });
    test("should return false if GameState is Paused", () => {
        expect(game.state).toEqual(GameState.Paused);
        expect(game.pause()).toBeFalsy();
    });
});

/**
 * Called when game is in the Paused state
 */
describe("resume", () => {
    test("should have GameState equal to Paused", () => {
        expect(game.state).toEqual(GameState.Paused);
    });
    test("should set GameState to Playing", () => {
        expect(game.resume()).toBeTruthy();
        expect(game.state).toEqual(GameState.Playing);
    });
    test("should return false if GameState is Playing", () => {
        expect(game.state).toEqual(GameState.Playing);
        expect(game.resume()).toBeFalsy();
    });
});


/**
 * Called at any time the game must stop
 */
describe("quit", () => {
    test("should set GameState to None and started to false and clear countdown interval, setting it to 0", () => {
        expect(game.quit()).toBeTruthy();
        expect(game.state).toEqual(GameState.None);
        expect(game.animationFrame).toEqual(0);
    });
});