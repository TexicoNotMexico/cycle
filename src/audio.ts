import * as Tone from "tone";
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

const initializeTonejs = async () => {
    await Tone.start();

    sounds = new Tone.Players(audioFiles).toDestination();

    Tone.Transport.bpm.value = 100;

    Tone.Transport.scheduleRepeat(
        (time) => {
            let cumulativeDuration: number = 0;
            for (let notes of CycleShapes.kickCycle.path) {
                if (notes.direction !== "thru") sounds.player(Drums.Kick).start(time + cumulativeDuration);
                cumulativeDuration += Tone.Time(notes.duration).valueOf();
            }
        },
        CycleShapes.kickCycle.loopDuration,
        "+0"
    );

    Tone.Transport.scheduleRepeat(
        (time) => {
            let cumulativeDuration: number = 0;
            for (let notes of CycleShapes.snareCycle.path) {
                if (notes.direction !== "thru") sounds.player(Drums.Snare).start(time + cumulativeDuration);
                cumulativeDuration += Tone.Time(notes.duration).valueOf();
            }
        },
        CycleShapes.snareCycle.loopDuration,
        "+0"
    );

    Tone.Transport.scheduleRepeat(
        (time) => {
            let cumulativeDuration: number = 0;
            for (let notes of CycleShapes.closedHihatCycle.path) {
                if (notes.direction !== "thru") sounds.player(Drums.ClosedHihat).start(time + cumulativeDuration);
                cumulativeDuration += Tone.Time(notes.duration).valueOf();
            }
        },
        CycleShapes.closedHihatCycle.loopDuration,
        "+0"
    );

    Tone.Transport.scheduleRepeat(
        (time) => {
            let cumulativeDuration: number = 0;
            for (let notes of CycleShapes.openHihatCycle.path) {
                if (notes.direction !== "thru") sounds.player(Drums.OpenHihat).start(time + cumulativeDuration);
                cumulativeDuration += Tone.Time(notes.duration).valueOf();
            }
        },
        CycleShapes.openHihatCycle.loopDuration,
        "+0"
    );

    await Tone.loaded();

    isInitialized = true;
};

export const playSound = async () => {
    if (!isInitialized) await initializeTonejs();

    if (Tone.Transport.state === "started") Tone.Transport.stop();

    Tone.Transport.start("+0", "0:0:0");
};
