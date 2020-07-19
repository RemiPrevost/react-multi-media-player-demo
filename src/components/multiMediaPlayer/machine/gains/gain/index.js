import { states } from "./states";

import { transitionsFactory } from "./transitions";

import { muteActionCreator, unmuteActionCreator } from "./actions";

const { audible, muted } = states;

export const gainStates = (mediaId) => {
  const { TOGGLE_MUTE } = transitionsFactory(mediaId);
  return {
    initial: audible,
    states: {
      [audible]: {
        on: {
          [TOGGLE_MUTE]: {
            target: muted,
            actions: muteActionCreator(mediaId),
          },
        },
      },
      [muted]: {
        on: {
          [TOGGLE_MUTE]: {
            target: audible,
            actions: unmuteActionCreator(mediaId),
          },
        },
      },
    },
  };
};
