export const pauseAction = ({ medias }) => {
  const refs = Object.values(medias).map(({ ref }) => ref);
  const {
    "audio-sax-alto": {
      ref: { currentTime },
    },
  } = medias;
  refs.forEach((ref) => {
    ref.pause();
    try {
      ref.currentTime = currentTime;
    } catch (e) {
      console.error("ERROR when trying to set currentTime");
      console.error(e);
    }
  });
};

export const playAction = ({ medias }) => {
  const refArray = Object.values(medias).map(({ ref }) => ref);
  for (let i = 0, { length } = refArray; i < length; i += 1) {
    refArray[i].play();
  }
};

export const stopAction = ({ medias }) => {
  const refs = Object.values(medias).map(({ ref }) => ref);
  refs.forEach((ref) => {
    ref.pause();
    try {
      ref.currentTime = 0;
    } catch (e) {
      console.error("ERROR when trying to set currentTime");
      console.error(e);
    }
  });
};

export const updateCurrentTimeAction = ({ medias }) => {
  const {
    "audio-sax-alto": {
      ref: { currentTime },
    },
  } = medias;
  return currentTime;
};

export const updateDurationAction = ({ medias }) => {
  const {
    "audio-sax-alto": {
      ref: { duration },
    },
  } = medias;
  return duration || undefined;
};
