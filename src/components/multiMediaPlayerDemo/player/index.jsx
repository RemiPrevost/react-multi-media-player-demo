import React from "react";

import saxAltoVideo from "assets/videos/sax_alto.mp4";

import { MixTable } from "./mixTable";

import "./player.scss";
import { PlaybackController } from "./playbackController";

export function Player({ audios, isPlaying, pause, play }) {
  return (
    <div className="player">
      <div className="body">
        <div className="video-container">
          <div className="video-inner-container">
            <video>
              <source src={saxAltoVideo} />
            </video>
          </div>
        </div>
        <div className="mix-table-container">
          <MixTable audios={audios} />
        </div>
      </div>
      <div className="footer">
        <div className="left">Multimedia player demo</div>
        <div className="center">
          <PlaybackController isPlaying={isPlaying} pause={pause} play={play} />
        </div>
        <div className="right">MASTER VOLUME</div>
      </div>
    </div>
  );
}
