import { states } from "./states";

import { states as playbackState } from "../states";
import { states as machineState } from "../../states";

import { transitions as machineTransitions } from "../transitions";
import { transitions } from "./transitions";

import { stopAction } from "../actions";

const { history, userRequest, wasPlaying } = states;
const { playing } = playbackState;
const { playback } = machineState;

const { PLAY_PRESSED } = transitions;
const { END_REACHED } = machineTransitions;

export const pauseStates = {
  initial: userRequest,
  states: {
    [history]: {
      type: "history",
    },
    [userRequest]: {
      on: {
        [PLAY_PRESSED]: wasPlaying,
        [END_REACHED]: {
          actions: stopAction,
        },
      },
    },
    [wasPlaying]: {
      on: {
        "": `#multi-media-player.${playback}.${playing}`,
      },
    },
  },
};
