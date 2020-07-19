import { Machine } from "xstate";

import { states } from "./states";

import {
  alreadyBuffered,
  alreadyRegistered,
} from "./playback/loading/media/guards";
import { allMediaRegistered } from "./playback/guards";

import { pauseAction, playAction } from "./playback/actions";

import { playbackStates } from "./playback";
import { gainsStates } from "./gains";

const { gains, playback } = states;

export const machineFactory = (audioIds) => {
  const medias = {};
  const mediaIds = [...audioIds, "video"];
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
        audioContext: new (window.AudioContext || window.webkitAudioContext)(),
        currentTime: 0,
        duration: undefined,
        medias,
      },
      type: "parallel",
      states: {
        [playback]: {
          ...playbackStates(mediaIds),
        },
        [gains]: {
          ...gainsStates(mediaIds),
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
