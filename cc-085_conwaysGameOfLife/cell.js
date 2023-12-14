class Cell {
    static ALIVE_INCREMENT = 1.5//1.5;
    static DEAD_DECREMENT = 1//1;

    // Hue
    static ALIVE_MIN_HUE = 120;
    static ALIVE_MAX_HUE = 0;
    static DEAD_MIN_HUE = 300; // 360
    static DEAD_MAX_HUE = 220; // 300

    // Value
    static DEAD_MIN_VALUE = 40;
    static DEAD_MAX_VALUE = 20;

    // Alpha
    static ALIVE_ALPHA = 20;
    static DEAD_ALPHA = 10;

    constructor(x, y, isAlive) {
        this.x = x;
        this.y = y;
        this.isAlive = isAlive;
        this.color = color(100, 100, 100);
        this.age = 0;
    }

    revive() {
        this.isAlive = true;
    }

    kill() {
        this.isAlive = false;
    }

    update() {
        let hue;
        if (this.isAlive) {
            this.age += Cell.ALIVE_INCREMENT;
            this.age = constrain(this.age, -100, 100);

            hue = map(this.age, 0, 100, Cell.ALIVE_MIN_HUE, Cell.ALIVE_MAX_HUE); // Green->red
            this.color = color(hue, 100, 100, Cell.ALIVE_ALPHA);
        }
        else {
            this.age -= Cell.DEAD_DECREMENT;
            this.age = constrain(this.age, -100, 100);

            hue = map(this.age, 0, -100, Cell.DEAD_MIN_HUE, Cell.DEAD_MAX_HUE); // Purple->teal 
            let value = map(this.age, 0, -100, Cell.DEAD_MIN_VALUE, Cell.DEAD_MAX_VALUE);
            this.color = color(hue, 100, value, Cell.DEAD_ALPHA);
        }
    }

}