import React from "react";

import "./mixTable.scss";
import { Track } from "./track";

export function MixTable({ mixedAudios }) {
  return (
    <div className="mix-table">
      <h1>Tracks</h1>
      {Object.entries(mixedAudios).map(([id, { muted, name, toggleMute }]) => (
        <Track key={id} muted={muted} name={name} toggleMute={toggleMute} />
      ))}
    </div>
  );
}
