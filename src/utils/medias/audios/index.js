import { transitionsFactory } from "components/multiMediaPlayer/machine/playback/loading/media/transitions";

const createAudio = ({ addEventListeners, file, id, send }) => {
  const { REGISTER_MEDIA } = transitionsFactory(id);

  const audio = new Audio(file);

  send({ type: REGISTER_MEDIA, media: { ref: audio } });

  audio.load();

  return addEventListeners(audio, id);
};

export const createAudios = ({ addEventListeners, audios, send }) => {
  Object.entries(audios).forEach(([id, audio]) => {
    createAudio({
      ...audio,
      addEventListeners,
      id: `audio-${id}`,
      send,
    });
  });
};
