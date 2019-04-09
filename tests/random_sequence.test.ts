import { RandomSequence } from "../src/game/random_sequence";


const sequence: RandomSequence = new RandomSequence(10);

describe("constructor", () => {
    test("should set length to size", () => {
        expect(sequence.sequence.length).toEqual(10);
    });
    test("should not follow a linear order", (done: jest.DoneCallback) => {
        for (let i = 0; i < 10; i++) {
            if (i != sequence.sequence[i]) {
                done();
            }
        }
    });
});

describe("shuffle", () => {
    test("should shuffle array", (done: jest.DoneCallback) => {
        var array = [1, 2, 3, 4];
        sequence.shuffle(array);
        for (let i = 0; i < array.length; i++) {
            if (i != array[i]) {
                done();
            }
        }
    });
});

describe("reset", () => {
    test("should fill an array and shuffle", (done: jest.DoneCallback) => {
        let copied = [];
        for (let i = 0; i < sequence.sequence.length; i++) {
            copied[i] = sequence.sequence[i];
        }
        sequence.reset(copied.length);
        for (let i = 0; i < sequence.sequence.length; i++) {
            if (copied[i] != sequence.sequence[i]) {
                done();
            }
        }
    });
});