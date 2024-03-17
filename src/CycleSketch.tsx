import * as Tone from "tone";
import { Sketch, ReactP5Wrapper } from "@p5-wrapper/react";
import { drawingProperties } from "./audio";

const CycleSketch = () => {
    let colorsAndNames: string[][] = [
        ["犯", "#FF0000"],
        ["嬲", "#00FF00"],
        ["嵌", "#0000FF"],
        ["孕", "#FF8800"],
    ];

    let x = [-700, -700, -700, -700];
    let y = [0, 0, 0, 0];
    let distance = [80, 80, 80, 80];
    let angle = [0, 0, 0, 0];

    const cycleInstance: Sketch = (p5) => {
        p5.setup = () => {
            p5.createCanvas(1700, 900);
            p5.frameRate(60);
            p5.background(10);
        };

        p5.draw = () => {
            p5.background(10, 13);
            p5.translate(p5.width / 2, p5.height / 2);

            drawingProperties.forEach((value, index, array) => {
                if (value[0] === true) {
                    if (value[1] !== "thru") {
                        p5.textSize(200);
                        p5.textAlign(p5.CENTER, p5.CENTER);
                        p5.noStroke();
                        p5.fill(colorsAndNames[index][1]);
                        p5.text(
                            colorsAndNames[index][0],
                            index === 0 || index === 2 ? -500 : 500,
                            index === 0 || index === 1 ? -200 : 200
                        );
                    }

                    distance[index] = Tone.Time(value[2]).toTicks();

                    let newX = x[index] + distance[index] * p5.cos(p5.radians(angle[index]));
                    let newY = y[index] + distance[index] * p5.sin(p5.radians(angle[index]));

                    p5.strokeWeight(8);
                    p5.stroke(colorsAndNames[index][1]);
                    p5.line(x[index], y[index], newX, newY);

                    switch (value[1]) {
                        case "right":
                            angle[index] += 90;
                            break;
                        case "left":
                            angle[index] -= 90;
                            break;
                        case "return":
                            angle[index] += 180;
                            break;
                    }

                    x[index] = newX;
                    y[index] = newY;

                    array[index][0] = false;
                }
            });
        };
    };
    return <ReactP5Wrapper sketch={cycleInstance} />;
};

export default CycleSketch;
