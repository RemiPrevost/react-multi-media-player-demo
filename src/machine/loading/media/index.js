import { states } from "./states";

import { transitionsFactory } from "./transitions";

import { mediaReadyActionCreator, registerMediaActionCreator } from "./actions";

const { buffering, pendingRegistration, ready } = states;

export const mediaStates = (mediaId) => {
  const { MEDIA_BUFFERED, REGISTER_MEDIA } = transitionsFactory(mediaId);
  return {
    initial: pendingRegistration,
    states: {
      [pendingRegistration]: {
        on: {
          [REGISTER_MEDIA]: {
            target: buffering,
            actions: registerMediaActionCreator(mediaId),
          },
          "": {
            target: buffering,
            cond: {
              type: "alreadyRegistered",
              mediaId,
            },
          },
        },
      },
      [buffering]: {
        on: {
          [MEDIA_BUFFERED]: ready,
          "": {
            target: ready,
            cond: {
              type: "alreadyBuffered",
              mediaId,
            },
          },
        },
      },
      [ready]: {
        entry: mediaReadyActionCreator(),
      },
    },
  };
};
