import React, { useContext, useEffect, useRef } from "react";

import { MachineContext } from "context";

import { transitionsFactory } from "components/multiMediaPlayer/machine/playback/loading/media/transitions";

export function Audio({ addEventListeners, audioContext, file, id }) {
  const ref = useRef(null);
  const { REGISTER_MEDIA } = transitionsFactory(id);

  const [, send] = useContext(MachineContext);

  useEffect(() => {
    const { current } = ref;
    if (current !== null) {
      const source = audioContext.createMediaElementSource(current);
      const gainNode = audioContext.createGain();
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      send({ type: REGISTER_MEDIA, media: { ref: current, gainNode } });

      current.load();

      return addEventListeners(current, id);
    }
    return undefined;
  }, [REGISTER_MEDIA, addEventListeners, audioContext, id, ref, send]);

  return (
    <div className="audio-container">
      <audio ref={ref}>
        <source src={file} />
      </audio>
    </div>
  );
}
