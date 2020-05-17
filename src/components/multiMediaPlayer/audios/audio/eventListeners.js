import { transitions as machineTransitions } from "components/multiMediaPlayer/machine/transitions";
import { transitions as pauseTransitions } from "components/multiMediaPlayer/machine/pause/transitions";
import { transitionsFactory as mediaTransitionFactory } from "components/multiMediaPlayer/machine/loading/media/transitions";

export const addEventListeners = (ref, id, send) => {
  const { END_REACHED, PAUSE_PRESSED } = machineTransitions;
  const { MEDIA_BUFFERED } = mediaTransitionFactory(id);
  const { PLAY_PRESSED } = pauseTransitions;

  const sendMediaBuffered = () => {
    send(MEDIA_BUFFERED);
  };

  const sendEndReached = () => {
    send(END_REACHED);
  };

  const sendPlay = () => {
    send(PLAY_PRESSED);
  };

  const sendPause = () => {
    send(PAUSE_PRESSED);
  };

  const events = [
    ["canplaythrough", sendMediaBuffered],
    ["ended", sendEndReached],
    ["play", sendPlay],
    ["pause", sendPause],
  ];
  events.forEach((event) => ref.addEventListener(...event));

  return () => {
    events.forEach((event) => ref.removeEventListener(...event));
  };
};
