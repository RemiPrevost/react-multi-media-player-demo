import React from "react";
import cn from "classnames";

import "./track.scss";

export function Track({ name, muted, toggleMute }) {
  return (
    <div className="track">
      <div className={cn("name", { active: !muted })}>{name}</div>
      <div className="buttons">
        <button
          className={cn({ active: muted })}
          onClick={toggleMute}
          type="button"
        >
          mute
        </button>
      </div>
    </div>
  );
}
