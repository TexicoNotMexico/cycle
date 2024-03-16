import CycleSketch from "./CycleSketch";
import { playSound } from "./audio";

const App = () => {
    return (
        <>
            <CycleSketch backgroundColor={10} contentColor={255} />
            <button onClick={playSound}>Play cycle</button>
        </>
    );
};

export default App;
