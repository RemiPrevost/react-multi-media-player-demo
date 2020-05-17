import { states } from "./states";
import { states as machineState } from "../states";

import { transitions } from "./transitions";

const { history, userRequest, wasPlaying } = states;
const { playing } = machineState;
const { PLAY_PRESSED } = transitions;

export const pauseStates = {
  initial: userRequest,
  states: {
    [history]: {
      type: "history",
    },
    [userRequest]: {
      on: {
        [PLAY_PRESSED]: wasPlaying,
      },
    },
    [wasPlaying]: {
      on: {
        "": `#multi-media-player.${playing}`,
      },
    },
  },
};
