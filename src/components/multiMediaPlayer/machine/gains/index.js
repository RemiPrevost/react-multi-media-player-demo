import { gainStates } from "./gain";

export const gainsStates = (mediaIds) => {
  const states = {};
  mediaIds.forEach((mediaId) => {
    states[`media_${mediaId}`] = gainStates(mediaId);
  });
  return {
    type: "parallel",
    states,
  };
};
