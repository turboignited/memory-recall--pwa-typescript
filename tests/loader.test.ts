import { Loader, LoadStatus, LoadProgress } from "../src/utils/loader";

describe("add", () => {
    test("should store name and number in loading map", () => {
        const loader = new Loader();
        loader.add("images", 100);
        expect(loader.loading.get("images")).toEqual({ remaining: 100, total: 100, error: false });
    });
    test("should not allow overring a previously stored key/value", () => {
        const loader = new Loader();
        expect(loader.add("images", 10)).toBeTruthy();
        expect(loader.loading.get("images")).toEqual({ remaining: 10, total: 10, error: false });
        expect(loader.add("images", 105)).toBeFalsy();
        expect(loader.loading.get("images")).toEqual({ remaining: 10, total: 10, error: false });
    });
})
describe("error", () => {
    test("should set error field to true on stored key", () => {
        const loader = new Loader();
        loader.add("images", 10);
        expect(loader.loading.get("images")).toEqual({ remaining: 10, total: 10, error: false });
        loader.error("images");
        expect(loader.loading.get("images")).toEqual({ remaining: 10, total: 10, error: true });
    });
    test("should call error handler when called", (done: jest.DoneCallback) => {
        const loader = new Loader<string>();
        const callback = () => {
            const added = loader.loading.get("Hello");
            expect(added).not.toBeUndefined();
            if (added) {
                expect(added.error).toEqual(true);
            }
            done();
        }
        loader.setErrorListener(callback);
        loader.add("Hello", 10);
        loader.error("Hello");
    });
});

describe("load", () => {
    test("should return remaining - 1", () => {
        const loader = new Loader();
        loader.add("Hello", 100);
        for (let i = 99; i >= 0; i--) {
            expect(loader.load("Hello")).toEqual(i);
        }
    });
    test("shouldn't return less than 0 when called again", () => {
        const loader = new Loader();
        loader.add("Hello", 100);
        for (let i = 99; i >= -100; i--) {
            if (i <= 0) {
                expect(loader.load("Hello")).toEqual(0);
            } else {
                expect(loader.load("Hello")).toEqual(i);
            }
        }
    });
    test("should set loaded to equal + 1", () => {
        const loader = new Loader();
        loader.add("Hello", 40);
        for (let i = 0; i < 40; i++) {
            expect(loader.loaded).toEqual(i);
            loader.load("Hello");
        }
    });
    test("should call completed handler when remaining is 0", (done: jest.DoneCallback) => {
        const loader = new Loader<string>();
        let remaining = 10;
        const callback = () => {
            expect(remaining).toEqual(0);
            const added = loader.loading.get("Hello");
            expect(added).not.toBeUndefined();
            if (added) {
                expect(added.remaining).toEqual(0);
                expect(added.total).toEqual(10);
            }
            done();
        }
        loader.setCompletedListener(callback);
        loader.add("Hello", remaining);
        for (let i = 9; i >= 0; i--) {
            remaining--;
            expect(loader.load("Hello")).toEqual(i);
        }
    });
    test("should call progress handler when called", (done: jest.DoneCallback) => {
        const loader = new Loader<string>();
        let remaining = 10;
        const callback = (name: string, status: LoadStatus) => {
            expect(name).toEqual(name);
            expect(status.remaining).toEqual(remaining);
            expect(status.total).toEqual(10);
            expect(status.error).toBeFalsy();
            if (remaining == 0) {
                done();
            }
        }
        loader.setProgressListener(callback);
        loader.add("Hello", remaining);
        for (let i = remaining - 1; i >= 0; i--) {
            remaining--;
            expect(loader.load("Hello")).toEqual(remaining);
        }
    });
});

describe("setProgressListener", () => {
    test("should store callback function", () => {
        const loader = new Loader<string>();
        loader.setProgressListener((name: string, status: LoadStatus) => { });
        expect(loader.progressListener).not.toBeNull();
    });
});
describe("setCompletedListener", () => {
    test("should store callback function", () => {
        const loader = new Loader();
        loader.setCompletedListener(() => { });
        expect(loader.completedListener).not.toBeNull();
    });
});
describe("setErrorListener", () => {
    test("should store callback function", () => {
        const loader = new Loader();
        loader.setErrorListener(() => { });
        expect(loader.errorListener).not.toBeNull();
    });
});
describe("onCompleted", () => {
    test("should inform completed listener", (done: jest.DoneCallback) => {
        const loader = new Loader<string>();
        const callback = () => {
            done();
        }
        loader.setCompletedListener(callback);
        loader.onCompleted();
    });
});
describe("onError", () => {
    test("should inform error listener", (done: jest.DoneCallback) => {
        const loader = new Loader<string>();
        const callback = () => {
            done();
        }
        loader.setErrorListener(callback);
        loader.onError();
    });
});
describe("onProgress", () => {
    test("should inform progress listener", (done: jest.DoneCallback) => {
        const loader = new Loader<string>();
        const callback = (name: string, status: LoadStatus) => {
            expect(name).toEqual("Hello");
            expect(status.error).toBeFalsy();
            expect(status.total).toEqual(10);
            expect(status.remaining).toEqual(10);
            done();
        }
        loader.setProgressListener(callback);
        loader.onProgress("Hello", { error: false, remaining: 10, total: 10 });
    });
});
describe("percent", () => {
    test("should represent total and remaining as a percentage", () => {
        const loader = new Loader<string>();
        loader.add("Hello", 2);
        expect(loader.percent).toEqual(0);
        loader.load("Hello");
        expect(loader.percent).toEqual(0.5);
        loader.load("Hello");
        expect(loader.percent).toEqual(1);
    });
});

describe("reset", () => {
    test("should remove all loaded", () => {
        const loader = new Loader<string>();
        loader.add("1", 1);
        expect(loader.loading.size).toEqual(1);
        loader.add("2", 2);
        expect(loader.loading.size).toEqual(2);
        loader.reset();
        expect(loader.loading.size).toEqual(0);
    });
    test("should reset total and loaded to 0", () => {
        const loader = new Loader<string>();
        loader.add("1", 1);
        expect(loader.loading.size).toEqual(1);
        expect(loader.total).toEqual(1);
        expect(loader.loaded).toEqual(0);
        loader.reset();
        expect(loader.loading.size).toEqual(0);
        expect(loader.total).toEqual(0);
        expect(loader.loaded).toEqual(0);
    });
});