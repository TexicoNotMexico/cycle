import { Sketch, ReactP5Wrapper } from "@p5-wrapper/react";

const CycleSketch = (props: { backgroundColor: number; contentColor: number }) => {
    const cycleInstance: Sketch = (p5) => {
        p5.setup = () => {
            p5.createCanvas(1700, 900);
            p5.background(props.backgroundColor);
        };

        p5.draw = () => {
            if (p5.mouseIsPressed) {
                p5.stroke(props.contentColor);
                p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
            }
        };
    };
    return <ReactP5Wrapper sketch={cycleInstance} />;
};

export default CycleSketch;
