import { mediaStates } from "./media";

export const loadingStates = (mediaIds) => {
  const states = {};
  mediaIds.forEach((mediaId) => {
    states[`media_${mediaId}`] = mediaStates(mediaId);
  });
  return {
    type: "parallel",
    states,
  };
};
