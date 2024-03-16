import * as Tone from "tone";

/**
 * cycle の形と担当楽器
 */
export interface CycleShape {
    /**
     * 担当楽器
     */
    instrument: "kick" | "snare" | "closed" | "open";
    /**
     * ループ長
     */
    loopDuration: Tone.Unit.TimeObject;
    /**
     * cycle の形
     */
    path: {
        /**
         * 間隔
         */
        duration: Tone.Unit.TimeObject;
        /**
         * 曲がる方向
         */
        direction: "right" | "left" | "thru" | "return";
    }[];
}
