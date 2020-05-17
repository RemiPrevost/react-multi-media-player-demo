export const allMediaRegistered = ({ medias }, event, { state }) =>
  Object.keys(medias).filter(
    (mediaId) => !state.matches(`loading.media_${mediaId}.ready`)
  ).length === 0;
