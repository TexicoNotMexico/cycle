import { CycleShape } from "./types/CycleShape";

export const kickCycle: CycleShape = {
    instrument: "kick",
    loopDuration: {
        "1m": 1,
    },
    path: [
        {
            duration: {
                "8n": 1,
            },
            direction: "left",
        },
        {
            duration: {
                "4n": 1,
            },
            direction: "left",
        },
        {
            duration: {
                "8n": 1,
            },
            direction: "right",
        },
        {
            duration: {
                "8n": 1,
            },
            direction: "right",
        },
        {
            duration: {
                "4n": 1,
            },
            direction: "right",
        },
        {
            duration: {
                "8n": 1,
            },
            direction: "left",
        },
    ],
};

export const snareCycle: CycleShape = {
    instrument: "snare",
    loopDuration: {
        "1m": 2,
    },
    path: [
        {
            duration: {
                "4n": 1,
            },
            direction: "thru",
        },
        {
            duration: {
                "8n.": 1,
            },
            direction: "left",
        },
        {
            duration: {
                "8n": 1,
            },
            direction: "left",
        },
        {
            duration: {
                "8n.": 1,
            },
            direction: "right",
        },
        {
            duration: {
                "4n": 2,
            },
            direction: "left",
        },
        {
            duration: {
                "8n.": 1,
            },
            direction: "left",
        },
        {
            duration: {
                "8n": 1,
            },
            direction: "left",
        },
        {
            duration: {
                "8n.": 1,
            },
            direction: "right",
        },
        {
            duration: {
                "4n": 1,
            },
            direction: "right",
        },
    ],
};

export const closedHihatCycle: CycleShape = {
    instrument: "closed",
    loopDuration: {
        "1m": 1,
    },
    path: [
        {
            duration: {
                "8n": 1,
            },
            direction: "right",
        },
        {
            duration: {
                "8n": 1,
            },
            direction: "left",
        },
        {
            duration: {
                "4n": 1,
            },
            direction: "left",
        },
        {
            duration: {
                "4n": 1,
            },
            direction: "left",
        },
        {
            duration: {
                "8n": 1,
            },
            direction: "left",
        },
        {
            duration: {
                "8n": 1,
            },
            direction: "left",
        },
    ],
};

export const openHihatCycle: CycleShape = {
    instrument: "open",
    loopDuration: {
        "1m": 2,
    },
    path: [
        {
            duration: {
                "4n": 1,
            },
            direction: "thru",
        },
        {
            duration: {
                "4n": 1,
                "8n": 1,
            },
            direction: "return",
        },
        {
            duration: {
                "4n": 1,
                "8n": 1,
            },
            direction: "return",
        },
        {
            duration: {
                "4n": 1,
            },
            direction: "thru",
        },
        {
            duration: {
                "4n": 1,
                "8n": 1,
            },
            direction: "return",
        },
        {
            duration: {
                "4n": 1,
                "8n": 1,
            },
            direction: "return",
        },
    ],
};
