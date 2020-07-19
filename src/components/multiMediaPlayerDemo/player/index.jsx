import React from "react";

import { MixTable } from "./mixTable";
import { PlaybackController } from "./playbackController";
import { Video } from "./video";

import "./player.scss";

export function Player({
  addEventListeners,
  mixedAudios,
  currentTime,
  duration,
  isPlaying,
  pause,
  play,
  registerVideo,
}) {
  return (
    <div className="player">
      <div className="body">
        <Video
          addEventListeners={addEventListeners}
          registerVideo={registerVideo}
        />
        <div className="mix-table-container">
          <MixTable mixedAudios={mixedAudios} />
        </div>
      </div>
      <div className="footer">
        <div className="left">Multimedia player demo</div>
        <div className="center">
          <PlaybackController
            currentTime={currentTime}
            duration={duration}
            isPlaying={isPlaying}
            pause={pause}
            play={play}
          />
        </div>
        <div className="right">MASTER VOLUME</div>
      </div>
    </div>
  );
}
