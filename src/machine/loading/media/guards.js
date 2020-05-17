const HAVE_ENOUGH_DATA = 4; // https://www.w3schools.com/TAgs/av_prop_readystate.asp

export const alreadyRegistered = ({ medias }, event, { cond: { mediaId } }) =>
  medias[mediaId].ref !== null;

export const alreadyBuffered = ({ medias }, event, { cond: { mediaId } }) =>
  medias[mediaId].ref.readyState === HAVE_ENOUGH_DATA;
