const initialState = {
  audio: null,
  isPlaying: true,
  position: 0,
  duration: 0,
  percentage: 0,
  currentTime: 0,
  volume: 0.1,
  progressBarWidth: 0,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_POSITION":
      return { ...state, position: payload };
    case "SET_DURATION":
      return { ...state, duration: payload };
    case "SET_PERCENTAGE":
      return { ...state, percentage: payload };
    case "SET_CURRENT_TIME":
      return { ...state, currentTime: payload };
    case "SET_VOLUME":
      return { ...state, volume: payload };
    case "SET_PROGRESSBAR_WIDTH":
      return { ...state, progressBarWidth: payload };
    case "SET_IS_PLAYING":
      return { ...state, isPlaying: payload };
    case "SET_AUDIO":
      return { ...state, audio: payload };
    default:
      return state;
  }
};

export default reducer;
