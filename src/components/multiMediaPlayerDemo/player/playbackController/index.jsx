import React from "react";
import cn from "classnames";

import "./playbackController.scss";

export function PlaybackController({ isPlaying, play, pause }) {
  return (
    <div className="playback-controller">
      <button
        className={cn({ active: isPlaying })}
        type="button"
        onClick={isPlaying ? pause : play}
      >
        {isPlaying ? "PAUSE" : "PLAY"}
      </button>
    </div>
  );
}
