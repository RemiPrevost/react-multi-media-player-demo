export const muteActionCreator = (mediaId) => ({ medias }) => {
  medias[mediaId].ref.volume = 0;
};

export const unmuteActionCreator = (mediaId) => ({ medias }) => {
  medias[mediaId].ref.volume = 1;
};
