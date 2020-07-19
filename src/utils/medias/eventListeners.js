import { transitions as machineTransitions } from "components/multiMediaPlayer/machine/playback/transitions";
import { transitions as pauseTransitions } from "components/multiMediaPlayer/machine/playback/pause/transitions";
import { transitionsFactory as mediaTransitionFactory } from "components/multiMediaPlayer/machine/playback/loading/media/transitions";

export const addEventListenersFactory = (send) => (ref, id) => {
  const {
    END_REACHED,
    LOADED_META_DATA,
    PAUSE_PRESSED,
    TIME_UPDATE,
  } = machineTransitions;
  const { MEDIA_BUFFERED } = mediaTransitionFactory(id);
  const { PLAY_PRESSED } = pauseTransitions;

  const sendMediaBuffered = () => {
    send(MEDIA_BUFFERED);
  };

  const sendEndReached = () => {
    send(END_REACHED);
  };

  const sendLoadedMetaData = () => {
    send(LOADED_META_DATA);
  };

  const sendPlay = () => {
    send(PLAY_PRESSED);
  };

  const sendPause = () => {
    send(PAUSE_PRESSED);
  };

  const sendTimeUpdate = () => {
    send(TIME_UPDATE);
  };

  const events = [
    ["canplaythrough", sendMediaBuffered],
    ["ended", sendEndReached],
    ["loadedmetadata", sendLoadedMetaData],
    ["play", sendPlay],
    ["pause", sendPause],
    ["timeupdate", sendTimeUpdate],
  ];
  events.forEach((event) => ref.addEventListener(...event));

  return () => {
    events.forEach((event) => ref.removeEventListener(...event));
  };
};
