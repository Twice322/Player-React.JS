const initialState = {
  items: [],
  currentSongPlaying: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_SONGS_ITEMS":
      return {
        ...state,
        items: payload,
      };
    case "SET_CURRENT_SONG":
      return {
        ...state,
        currentSongPlaying: payload,
      };
    default:
      return state;
  }
};

export default reducer;
