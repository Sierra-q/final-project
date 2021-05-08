
class Slider {
    constructor(width, min, max, end1 = min, end2 = max, step = 1) {
        // visual
        this.width = width;
        this.x = 0;
        this.y = 0;

        // real values
        this.min = min;
        this.max = max;
        this.end1 = end1;
        this.end2 = end2;
        this.step = step;

        // other
        this.end1Selected = false;
        this.end2Selected = false;
    }

    update() {
        if (mouseIsPressed) {
            if (this.mouseOnEnd1()) {
                this.end1Selected = true;
            }
            if (this.mouseOnEnd2()) {
                this.end2Selected = true;
            }
        }

        if (this.end1Selected) {
            this.end1 = map(constrain(mouseX, this.x, this.x + this.width) - this.x,
                0, this.width, this.min, this.max);
        } else if (this.end2Selected) {
            this.end2 = map(constrain(mouseX, this.x, this.x + this.width) - this.x,
                0, this.width, this.min, this.max);
        }

        if (!mouseIsPressed) {
            this.end1Selected = false;
            this.regulateEnd1();

            this.end2Selected = false;
            this.regulateEnd2();

            if (this.end1 > this.end2) {
                let temp = this.end2;
                this.end2 = this.end1;
                this.end1 = temp;
            }
        }

    }

    mouseOnEnd1() {
        return dist(mouseX, mouseY, this.x + map(this.end1, this.min, this.max, 0, this.width),
            this.y) < 10;
    }

    mouseOnEnd2() {
        return dist(mouseX, mouseY, this.x + map(this.end2, this.min, this.max, 0, this.width),
            this.y) < 10;
    }

    regulateEnd1() {
        if (this.end1 % this.step != 0) {
            if (this.end1 % this.step <= this.step * 1 / 2) {
                this.end1 -= this.end1 % this.step;
            } else {
                this.end1 -= this.end1 % this.step - 1;
            }
        }
    }

    regulateEnd2() {
        if (this.end2 % this.step != 0) {
            if (this.end2 % this.step <= this.step * 1 / 2) {
                this.end2 -= this.end2 % this.step;
            } else {
                this.end2 -= this.end2 % this.step - 1;
            }
        }
    }

    position(x, y) {
        this.x = x;
        this.y = y;
    }

    display() {
        push();
        translate(this.x, this.y);

        // line
        stroke(0);
        strokeWeight(5);
        line(0, 0, this.width, 0);

        // range
        stroke(255);
        strokeWeight(10);
        line(map(this.end1, this.min, this.max, 0, this.width), 0,
            map(this.end2, this.min, this.max, 0, this.width), 0);

        // end1
        if (this.mouseOnEnd1()) {
            stroke(255);
            circle(map(this.end1, this.min, this.max, 0, this.width), 0, 10);
        } else {
            stroke(200);
            circle(map(this.end1, this.min, this.max, 0, this.width), 0, 10);
        }
        // end2
        if (this.mouseOnEnd2()) {
            stroke(255);
            circle(map(this.end2, this.min, this.max, 0, this.width), 0, 10);
        } else {
            stroke(200);
            circle(map(this.end2, this.min, this.max, 0, this.width), 0, 10);
        }

        noStroke();
        fill(255);
        let textString = "min: " + this.min;
        textString += "\nmax: " + this.max;
        textString += "\nstep: " + this.step;
        textString += "\nend1: " + this.end1;
        textString += "\nend2: " + this.end2;
        textSize(25);
        text(textString, 50, 50);
        pop();
    }
}
