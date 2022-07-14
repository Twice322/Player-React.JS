const Actions = {
  setPercentage: (percentage) => ({
    type: "SET_PERCENTAGE",
    payload: percentage,
  }),
  setPosition: (position) => ({
    type: "SET_POSITION",
    payload: position,
  }),
  setIsPlaying: (bool) => ({
    type: "SET_IS_PLAYING",
    payload: bool,
  }),
  setCurrentTime: (time) => ({
    type: "SET_CURRENT_TIME",
    payload: time,
  }),
  setDuration: (duration) => ({
    type: "SET_DURATION",
    payload: duration,
  }),
  setProgressBarWidth: (width) => ({
    type: "SET_PROGRESSBAR_WIDTH",
    payload: width,
  }),
  setVolume: (volume) => ({
    type: "SET_VOLUME",
    payload: volume,
  }),
  setAudio: (ref) => ({
    type: "SET_AUDIO",
    payload: ref,
  }),
};

export default Actions;
