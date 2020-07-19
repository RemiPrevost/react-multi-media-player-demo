import { assign, send } from "xstate";
import { transitions } from "../../transitions";

const { MEDIA_READY } = transitions;

export const registerMediaActionCreator = (mediaId) =>
  assign({
    medias: ({ medias }, { media }) => ({
      ...medias,
      [mediaId]: media,
    }),
  });

export const mediaReadyActionCreator = () => send(MEDIA_READY);
