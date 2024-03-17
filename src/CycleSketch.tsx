import { Sketch, ReactP5Wrapper } from "@p5-wrapper/react";
import { drawTriggers } from "./audio";

const CycleSketch = (props: { backgroundColor: number; contentColor: number }) => {
    let colorsAndNames: string[][] = [
        ["キック", "#FF0000"],
        ["スネア", "#00FF00"],
        ["Cハット", "#0000FF"],
        ["Oハット", "#FF8800"],
    ];
    const cycleInstance: Sketch = (p5) => {
        p5.setup = () => {
            p5.createCanvas(1700, 900);
            p5.frameRate(60);
            p5.background(props.backgroundColor);
        };

        p5.draw = () => {
            p5.background(props.backgroundColor, 70);
            if (p5.mouseIsPressed) {
                p5.stroke(props.contentColor);
                p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
            }
            drawTriggers.forEach((value, index, array) => {
                if (value === true) {
                    p5.textSize(200);
                    p5.textAlign(p5.CENTER, p5.CENTER);
                    p5.noStroke();
                    p5.fill(colorsAndNames[index][1]);
                    p5.text(
                        colorsAndNames[index][0],
                        index === 0 || index === 2 ? 450 : 1250,
                        index === 0 || index === 1 ? 200 : 700
                    );
                    array[index] = false;
                }
            });
        };
    };
    return <ReactP5Wrapper sketch={cycleInstance} />;
};

export default CycleSketch;
