import React, { useEffect, useState } from "react";
import { useMachine } from "@xstate/react";

import { MachineContext } from "context";

import { machineFactory } from "machine";

import { Controller } from "./controller";
import { MixTable } from "./mixTable";

import "./multiMediaPlayer.scss";

export function MultiMediaPlayer({ audios }) {
  const [machineReady, setMachineReady] = useState(false);

  const machine = useMachine(machineFactory(audios.map(({ id }) => id)));

  const [, , service] = machine;
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

  return (
    <MachineContext.Provider value={machine}>
      <div className="audio-player-container">
        {machineReady && (
          <>
            <Controller />
            <MixTable tracks={audios} />
          </>
        )}
      </div>
    </MachineContext.Provider>
  );
}
