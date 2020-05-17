import React, { useEffect, useMemo } from "react";

import { Audio } from "./audio";

export function Audios({ tracks }) {
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
    <>
      {tracks.map((track) => (
        <Audio
          {...track}
          audioContext={audioContext}
          key={track.name}
          masterGain={masterGainNode}
        />
      ))}
    </>
  );
}
