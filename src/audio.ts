import * as Tone from "tone";
import { CycleShape } from "./types/CycleShape";
import * as CycleShapes from "./createshapes";

let isInitialized = false;

const audioFiles: Tone.ToneAudioBuffersUrlMap = {
    kick: "kick.wav",
    snare: "snare.wav",
    closed: "closed.wav",
    open: "open.wav", // FIXME: クローズ音を別ける。多分いい感じに別けられる気がする（でも実装が面倒な可能性がある）
};

let sounds: Tone.Players;

export let drawingProperties: [boolean, "right" | "left" | "thru" | "return" | null, Tone.Unit.TimeObject][] = [
    [false, null, { "8n": 1 }],
    [false, null, { "8n": 1 }],
    [false, null, { "8n": 1 }],
    [false, null, { "8n": 1 }],
];

export const CycleShapesCollection: CycleShape[] = [
    CycleShapes.kickCycle,
    CycleShapes.snareCycle,
    CycleShapes.closedHihatCycle,
    CycleShapes.openHihatCycle,
];

const declareScheduleRepeat = (cycleShapeTarget: CycleShape, drawTriggerIndex: number) => {
    Tone.Transport.scheduleRepeat(
        (time) => {
            let cumulativeDuration: number = 0;
            for (let notes of cycleShapeTarget.path) {
                if (notes.direction !== "thru") {
                    sounds.player(cycleShapeTarget.instrument).start(time + cumulativeDuration);
                }
                Tone.Draw.schedule(() => {
                    drawingProperties[drawTriggerIndex] = [true, notes.direction, notes.duration];
                }, time + cumulativeDuration);
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

    CycleShapesCollection.forEach((cycle, index) => {
        declareScheduleRepeat(cycle, index);
    });

    await Tone.loaded();

    isInitialized = true;
};

export const playSound = async () => {
    if (!isInitialized) await initializeTonejs();

    if (Tone.Transport.state === "started") {
        Tone.Transport.pause();
        return;
    }

    Tone.Transport.start("+0", "0:0:0");
};
