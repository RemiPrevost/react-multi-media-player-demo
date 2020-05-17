import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { MachineContext } from "context";

import { transitionsFactory } from "components/multiMediaPlayer/machine/loading/media/transitions";

import { addEventListeners } from "./eventListeners";

export function Audio({ audioContext, file, id, masterGain, name }) {
  const ref = useRef(null);
  const { REGISTER_MEDIA } = transitionsFactory(id);

  const [, send] = useContext(MachineContext);

  const [muted, setMuted] = useState(false);
  const toggleMute = useCallback(() => {
    setMuted(!muted);
  }, [muted, setMuted]);

  useEffect(() => {
    if (ref !== null) {
      const { current } = ref;

      const source = audioContext.createMediaElementSource(current);
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 1;
      source.connect(gainNode);
      gainNode.connect(masterGain);

      send({ type: REGISTER_MEDIA, media: { ref: current, gainNode } });

      return addEventListeners(current, id, send);
    }
    return undefined;
  }, [REGISTER_MEDIA, audioContext, id, masterGain, ref, send]);

  useEffect(() => {
    if (ref !== null) {
      if (muted) {
        ref.current.volume = 0;
      } else {
        ref.current.volume = 1;
      }
    }
  }, [muted]);

  return (
    <div className="audio-container">
      <audio preload="auto" ref={ref} mediaGroup="audio">
        <source src={file} />
      </audio>
    </div>
  );
}
