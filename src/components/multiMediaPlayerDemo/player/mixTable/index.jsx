import React from "react";

import "./mixTable.scss";
import { Track } from "./track";

export function MixTable({ audios }) {
  return (
    <div className="mix-table">
      <h1>Tracks</h1>
      {audios.map(({ name }) => (
        <Track name={name} />
      ))}
    </div>
  );
}
