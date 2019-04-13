export class Maths {

    public static GreatestCommonDivisor(a: number, b: number): number {
        if (!b) {
            return a;
        }

        return this.GreatestCommonDivisor(b, a % b);
    }
}