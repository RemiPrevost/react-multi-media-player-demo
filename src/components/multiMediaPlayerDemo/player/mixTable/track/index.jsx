import React from "react";
import cn from "classnames";

import "./track.scss";

export function Track({ name, mute, solo, soloOutside }) {
  return (
    <div className="track">
      <div className={cn("name", { active: !mute && !soloOutside })}>
        {name}
      </div>
      <div className="buttons">
        <button className={cn({ active: mute })} type="button">
          mute
        </button>
        <button className={cn({ active: solo })} type="button">
          solo
        </button>
      </div>
    </div>
  );
}
