import React from "react";

import { Audio } from "./audio";

export function Audios({ addEventListeners, audioContext, tracks }) {
  return (
    <>
      {Object.entries(tracks).map(([id, track]) => (
        <Audio
          {...track}
          addEventListeners={addEventListeners}
          audioContext={audioContext}
          id={`audio-${id}`}
          key={track.name}
        />
      ))}
    </>
  );
}
