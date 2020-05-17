import { Machine } from "xstate";

import { states } from "./states";
import { states as pauseState } from "./pause/states";

import { transitions } from "./transitions";

import { loadingStates } from "./loading";
import { pauseStates } from "./pause";

import { alreadyBuffered, alreadyRegistered } from "./loading/media/guards";
import { allMediaRegistered } from "./guards";

import { pauseAction, playAction } from "./actions";

const { loading, pause, playing } = states;
const { history, userRequest } = pauseState;
const { END_REACHED, MEDIA_READY, PAUSE_PRESSED } = transitions;

export const machineFactory = (mediaIds) => {
  const medias = {};
  mediaIds.forEach((id) => {
    medias[id] = {
      ref: null,
      source: null,
    };
  });

  return Machine(
    {
      id: "multi-media-player",
      context: {
        medias,
      },
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
            [END_REACHED]: `${pause}.${userRequest}`,
          },
        },
      },
    },
    {
      actions: {
        playAction,
        pauseAction,
      },
      guards: {
        allMediaRegistered,
        alreadyRegistered,
        alreadyBuffered,
      },
    }
  );
};
