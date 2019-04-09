import { Game } from "../src/game/game";
import { Dimensions } from "../src/utils/dimensions";
import { GameState } from "../src/game/state";

jest.setTimeout(100000);



const game: Game = new Game(new Dimensions(200, 300, 400, 500));
/**
 * Called when the game is instantiated
 */
describe("construction-NEW", () => {
    test("should have GameState set to None", () => {
        expect(game.state).toEqual(GameState.None);
    });

    test("should have countdownInterval set to 0", () => {
        expect(game.countdownInterval).toEqual(0);
    });
    test("should have size set", () => {
        expect(game.size).not.toBeNull();
    });
})

/**
 * Called when the game is made visible
 */
describe("start", () => {
    test("should have GameState equal to None", () => {
        expect(game.state).toEqual(GameState.None);
    });
    test("should set GameState to Countdown", () => {
        expect(game.start()).toBeTruthy();
        expect(game.state).toEqual(GameState.Countdown);
    });
    test("should return false if GameState is Countdown", () => {
        expect(game.state).toEqual(GameState.Countdown);
        expect(game.start()).toBeFalsy();
    });
});

/**
 * Called when game in the Countdown state
 */
describe("countdown", () => {
    test("should have GameState equal to Countdown and countdownInterval undefined", () => {
        expect(game.state).toEqual(GameState.Countdown);

        expect(game.countdownInterval).toEqual(0);
    });
    test("should call callback each second and set GameState to Playing on last call", (done: jest.DoneCallback) => {
        let called = 0;
        const callback = (seconds: number) => {
            if (called == 0) {
                expect(seconds).toEqual(1);
                expect(game.countdownInterval).not.toEqual(0);
                called++;
            }
            else if (called == 1) {
                expect(seconds).toEqual(0);
                expect(game.countdownInterval).toEqual(0);
                expect(game.state).toEqual(GameState.Playing);
                done();
            }
        }
        expect(game.countdown(2, callback)).toBeTruthy();
    });
    test("should return false if state is not equal to Countdown", () => {
        expect(game.state).toEqual(GameState.Playing);
        expect(game.countdown(2, (seconds: number) => { })).toBeFalsy();
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
        expect(game.countdownInterval).toEqual(0);
    });
});