import { combineReducers } from "redux";

const reducers = ["playlist", "player"];

export default combineReducers(
  reducers.reduce((initial, name) => {
    initial[name] = require(`./${name}`).default;
    return initial;
  }, {})
);
