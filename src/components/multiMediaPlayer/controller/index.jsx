import React, { useCallback, useContext } from "react";

import { MachineContext } from "context";

import { transitions as pauseTransitions } from "machine/pause/transitions";
import { transitions as machineTransitions } from "machine/transitions";

import { states } from "machine/states";

import "./controller.scss";

const { PLAY_PRESSED } = pauseTransitions;
const { PAUSE_PRESSED } = machineTransitions;
const { playing } = states;

export function Controller() {
  const [current, send] = useContext(MachineContext);
  const isPlaying = current.matches(playing);
  const play = useCallback(() => send(PLAY_PRESSED), [send]);
  const pause = useCallback(() => send(PAUSE_PRESSED), [send]);

  return (
    <div className="controller-container">
      <button type="button" onClick={isPlaying ? pause : play}>
        {isPlaying ? "PAUSE" : "PLAY"}
      </button>
    </div>
  );
}
