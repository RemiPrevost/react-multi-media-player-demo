import React from "react";

import rhythmicAudio from "assets/audios/rhythmic.mp3";
import saxAltoAudio from "assets/audios/sax_alto.mp3";
import saxTenorAudio from "assets/audios/sax_tenor.mp3";
import tromboneAudio from "assets/audios/trombone.mp3";
import trumpetAudio from "assets/audios/trumpet.mp3";

import { MultiMediaPlayer } from "../multiMediaPlayer";
import { Player } from "./player";

export function MultiMediaPlayerDemo() {
  return (
    <MultiMediaPlayer
      audios={{
        rhythmic: { file: rhythmicAudio, name: "Rhythmic" },
        "sax-alto": { file: saxAltoAudio, name: "Sax alto" },
        "sax-tenor": { file: saxTenorAudio, name: "Sax tenor" },
        trombone: { file: tromboneAudio, name: "Trombone" },
        trumpet: { file: trumpetAudio, name: "Trumpet" },
      }}
    >
      {Player}
    </MultiMediaPlayer>
  );
}
