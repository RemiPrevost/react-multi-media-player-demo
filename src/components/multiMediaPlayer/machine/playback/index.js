import { assign } from "xstate";

import { states } from "./states";

import { loadingStates } from "./loading";
import { pauseStates } from "./pause";

import {
  stopAction,
  updateCurrentTimeAction,
  updateDurationAction,
} from "./actions";

import { states as pauseState } from "./pause/states";

import { transitions } from "./transitions";

const { loading, pause, playing } = states;
const { history, userRequest } = pauseState;
const {
  END_REACHED,
  LOADED_META_DATA,
  MEDIA_READY,
  PAUSE_PRESSED,
  TIME_UPDATE,
} = transitions;

export const playbackStates = (mediaIds) => ({
  initial: loading,
  states: {
    [loading]: {
      ...loadingStates(mediaIds),
      on: {
        [MEDIA_READY]: {
          target: `${pause}.${history}`,
          cond: "allMediaRegistered",
        },
      },
    },
    [pause]: {
      ...pauseStates,
    },
    [playing]: {
      entry: "playAction",
      exit: "pauseAction",
      on: {
        [PAUSE_PRESSED]: `${pause}.${userRequest}`,
        [END_REACHED]: {
          target: `${pause}.${userRequest}`,
          actions: stopAction,
        },
      },
    },
  },
  on: {
    [LOADED_META_DATA]: {
      actions: assign({
        duration: updateDurationAction,
      }),
    },
    [TIME_UPDATE]: {
      actions: assign({
        currentTime: updateCurrentTimeAction,
      }),
    },
  },
});
