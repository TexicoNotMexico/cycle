import CycleSketch from "./CycleSketch";
import { playSound } from "./audio";

const App = () => {
    return (
        <>
            <CycleSketch />
            <button onClick={playSound}>Play cycle</button>
        </>
    );
};

export default App;
