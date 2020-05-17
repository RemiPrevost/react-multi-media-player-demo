import React, { useCallback, useEffect, useState } from "react";
import { useMachine } from "@xstate/react";

import { MachineContext } from "context";

import { machineFactory } from "components/multiMediaPlayer/machine";

import { Audios } from "./audios";

import { states } from "./machine/states";
import { transitions as pauseTransitions } from "./machine/pause/transitions";
import { transitions as machineTransitions } from "./machine/transitions";

const { playing } = states;
const { PLAY_PRESSED } = pauseTransitions;
const { PAUSE_PRESSED } = machineTransitions;

export function MultiMediaPlayer({ audios, children }) {
  const [machineReady, setMachineReady] = useState(false);

  const machine = useMachine(machineFactory(audios.map(({ id }) => id)));

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

  const isPlaying = current.matches(playing);
  const play = useCallback(() => send(PLAY_PRESSED), [send]);
  const pause = useCallback(() => send(PAUSE_PRESSED), [send]);
  return (
    <MachineContext.Provider value={machine}>
      {machineReady && (
        <>
          {children({ audios, isPlaying, pause, play })}
          <Audios tracks={audios} />
        </>
      )}
    </MachineContext.Provider>
  );
}
