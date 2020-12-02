export default class RandomUtil {

    public static random(x: number, y: number): number {
        let temp = x;
        if (x > y) {
            x = y;
            y = temp;
        }
        return Math.round(Math.random() * (y - x) + x)
    }
}