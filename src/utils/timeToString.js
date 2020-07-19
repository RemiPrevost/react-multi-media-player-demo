export const timeToString = (time = 0) => {
  const seconds = `${Math.floor(time % 60)}`;
  const secondsToString = seconds.length === 1 ? `0${seconds}` : seconds;
  return `${Math.floor(time / 60)}:${secondsToString}`;
};
