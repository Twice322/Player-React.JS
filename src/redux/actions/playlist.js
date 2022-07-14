import data from "../../import.json";

const Actions = {
  setSongs: (items) => ({
    type: "SET_SONGS_ITEMS",
    payload: items,
  }),
  setCurrentSong: (song) => ({
    type: "SET_CURRENT_SONG",
    payload: song,
  }),
  fetchPlaylist: () => (dispatch) => {
    dispatch(Actions.setSongs(data.songs));
  },
};

export default Actions;
