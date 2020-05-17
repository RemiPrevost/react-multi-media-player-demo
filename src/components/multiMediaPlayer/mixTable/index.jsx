import React, { useEffect, useMemo } from "react";

import { Audio } from "./audio";

import "./mixTable.scss";

export function MixTable({ tracks }) {
  const audioContext = useMemo(
    () => new (window.AudioContext || window.webkitAudioContext)(),
    []
  );

  const masterGainNode = useMemo(() => audioContext.createGain(), [
    audioContext,
  ]);

  useEffect(() => {
    masterGainNode.connect(audioContext.destination);
    masterGainNode.gain.value = 1;
  }, [audioContext, masterGainNode]);

  return (
    <div className="mix-table-container">
      {tracks.map((track) => (
        <Audio
          {...track}
          audioContext={audioContext}
          key={track.name}
          masterGain={masterGainNode}
        />
      ))}
    </div>
  );
}
