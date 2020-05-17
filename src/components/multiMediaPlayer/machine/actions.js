export const playAction = ({ medias }) => {
  Object.values(medias).forEach(({ ref }) => {
    ref.play();
  });
};

export const pauseAction = ({ medias }) => {
  const refs = Object.values(medias).map(({ ref }) => ref);
  refs.forEach((ref) => {
    ref.pause();
  });
};
