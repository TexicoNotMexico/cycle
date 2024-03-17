import * as Tone from "tone";
import { CycleShape } from "./types/CycleShape";
import * as CycleShapes from "./createshapes";

let isInitialized = false;

enum Drums {
    Kick = "kick",
    Snare = "snare",
    ClosedHihat = "closed",
    OpenHihat = "open",
}

const audioFiles: Tone.ToneAudioBuffersUrlMap = {
    kick: "kick.wav",
    snare: "snare.wav",
    closed: "closed.wav",
    open: "open.wav", // FIXME: クローズ音を別ける。多分いい感じに別けられる気がする（でも実装が面倒な可能性がある）
};

let sounds: Tone.Players;

export let drawTriggers: boolean[] = [false, false, false, false];

const declareScheduleRepeat = (cycleShapeTarget: CycleShape, drawTriggerIndex: number) => {
    Tone.Transport.scheduleRepeat(
        (time) => {
            let cumulativeDuration: number = 0;
            for (let notes of cycleShapeTarget.path) {
                if (notes.direction !== "thru") {
                    sounds.player(cycleShapeTarget.instrument).start(time + cumulativeDuration);
                    Tone.Draw.schedule(() => {
                        drawTriggers[drawTriggerIndex] = true;
                    }, time + cumulativeDuration);
                }
                cumulativeDuration += Tone.Time(notes.duration).valueOf();
            }
        },
        cycleShapeTarget.loopDuration,
        "+0"
    );
};

const initializeTonejs = async () => {
    await Tone.start();

    sounds = new Tone.Players(audioFiles).toDestination();

    Tone.Transport.bpm.value = 100;

    declareScheduleRepeat(CycleShapes.kickCycle, 0);
    declareScheduleRepeat(CycleShapes.snareCycle, 1);
    declareScheduleRepeat(CycleShapes.closedHihatCycle, 2);
    declareScheduleRepeat(CycleShapes.openHihatCycle, 3);

    await Tone.loaded();

    isInitialized = true;
};

export const playSound = async () => {
    if (!isInitialized) await initializeTonejs();

    if (Tone.Transport.state === "started") Tone.Transport.stop();

    Tone.Transport.start("+0", "0:0:0");
};
