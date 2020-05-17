import React from "react";

import { MultiMediaPlayer } from "components/multiMediaPlayer";

import saxAltoAudio from "assets/audios/sax_alto.mp3";
import saxTenorAudio from "assets/audios/sax_tenor.mp3";
import tromboneAudio from "assets/audios/trombone.mp3";
import trumpetAudio from "assets/audios/trumpet.mp3";
import saxAltoVideo from "assets/videos/sax_alto.mp4";

import "./app.scss";

export function App() {
  return (
    <div className="app-container">
      <MultiMediaPlayer
        audios={[
          { file: saxAltoAudio, id: "sax-alto", name: "Sax alto" },
          { file: saxTenorAudio, id: "sax-tenor", name: "Sax tenor" },
          { file: tromboneAudio, id: "trombone", name: "Trombone" },
          { file: trumpetAudio, id: "trumpet", name: "Trumpet" },
        ]}
        video={{ file: saxAltoVideo }}
      />
    </div>
  );
}
