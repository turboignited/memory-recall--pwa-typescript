import { Dimensions } from "./utils/dimensions";

export class Statics {
    public static Dimensions: Dimensions = new Dimensions(1280, 720, window.innerWidth - 20, window.innerHeight - 20);
}