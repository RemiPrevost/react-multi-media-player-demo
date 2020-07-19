import React from "react";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";

import { timeToString } from "utils/timeToString";

import "./playbackController.scss";

export function PlaybackController({
  currentTime = 0,
  duration = 0,
  isPlaying,
  play,
  pause,
}) {
  const progress = duration ? 100 * (currentTime / duration) : 0;

  return (
    <div className="playback-controller">
      <div className="top">
        <button
          className={cn({ active: isPlaying })}
          type="button"
          onClick={isPlaying ? pause : play}
        >
          <FontAwesomeIcon icon={isPlaying ? faPauseCircle : faPlayCircle} />
        </button>
      </div>
      <div className="bottom">
        <span>{timeToString(currentTime)}</span>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <span>{timeToString(duration)}</span>
      </div>
    </div>
  );
}
