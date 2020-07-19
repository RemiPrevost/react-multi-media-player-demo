import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMachine } from "@xstate/react";

import { MachineContext } from "context";

import { machineFactory } from "components/multiMediaPlayer/machine";

import { createAudios } from "utils/medias/audios";

import { states as machineStates } from "./machine/states";
import { states as playbackStates } from "./machine/playback/states";
import { states as gainStates } from "./machine/gains/gain/states";

import { transitions as pauseTransitions } from "./machine/playback/pause/transitions";
import { transitions as machineTransitions } from "./machine/playback/transitions";
import { transitionsFactory as mediaTransitionsFactory } from "./machine/playback/loading/media/transitions";
import { transitionsFactory as gainTransitionsFactory } from "./machine/gains/gain/transitions";

import { addEventListenersFactory } from "../../utils/medias/eventListeners";

const { playback, gains } = machineStates;
const { playing } = playbackStates;
const { muted } = gainStates;
const { PLAY_PRESSED } = pauseTransitions;
const { PAUSE_PRESSED } = machineTransitions;

export function MultiMediaPlayer({ audios, children }) {
  const [machineReady, setMachineReady] = useState(false);

  const machine = useMachine(
    machineFactory([...Object.keys(audios).map((id) => `audio-${id}`)])
  );

  const [current, send, service] = machine;
  useEffect(() => {
    const subscription = service.subscribe(({ context, event, value }) => {
      // simple state logging
      console.log("context: ", context);
      console.log("event: ", event);
      console.log("value: ", value);
      console.log("");
      setMachineReady(true);
    });

    return subscription.unsubscribe;
  }, [service]);

  const addEventListeners = useMemo(() => addEventListenersFactory(send), [
    send,
  ]);

  const isPlaying = current.matches(`${playback}.${playing}`);

  const mixedAudios = useMemo(() => {
    const mix = {};
    Object.entries(audios).forEach(([id, audio]) => {
      const { TOGGLE_MUTE } = gainTransitionsFactory(`audio-${id}`);
      mix[id] = {
        ...audio,
        muted: current.matches(`${gains}.media_audio-${id}.${muted}`),
        toggleMute: () => send(TOGGLE_MUTE),
      };
    });
    return mix;
  }, [audios, current, send]);

  const { REGISTER_MEDIA } = mediaTransitionsFactory("video");
  const play = useCallback(() => send(PLAY_PRESSED), [send]);
  const pause = useCallback(() => send(PAUSE_PRESSED), [send]);
  const registerVideo = useCallback(
    (ref) => send({ type: REGISTER_MEDIA, media: { ref } }),
    [REGISTER_MEDIA, send]
  );

  const {
    context: { currentTime, duration },
  } = current;

  useEffect(() => {
    if (machineReady) {
      createAudios({ addEventListeners, audios, send });
    }
  }, [addEventListeners, audios, send, machineReady]);

  return (
    <MachineContext.Provider value={machine}>
      {machineReady && (
        <>
          {children({
            addEventListeners,
            mixedAudios,
            currentTime,
            duration,
            isPlaying,
            pause,
            play,
            registerVideo,
          })}
        </>
      )}
    </MachineContext.Provider>
  );
}
