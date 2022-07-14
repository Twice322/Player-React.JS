import React from "react";
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretRightOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { playlistActions } from "../../redux/actions";
const ControlPanel = ({
  play,
  isPlaying,
  setCurrentSong,
  currentSongPlaying,
  items,
}) => {
  const nextSong = (forward = true) => {
    if (forward) {
      const newIndex = +currentSongPlaying + 1;
      if (newIndex > items.length) {
        setCurrentSong(String(1));
      } else {
        setCurrentSong(String(newIndex));
      }
    } else {
      const newIndex = +currentSongPlaying - 1;
      if (newIndex < 1) {
        setCurrentSong(String(items.length));
      } else {
        setCurrentSong(String(newIndex));
      }
    }
  };

  return (
    <div className="player-actions">
      <StepBackwardOutlined onClick={() => nextSong(false)} />
      {isPlaying ? (
        <PauseOutlined onClick={play} />
      ) : (
        <CaretRightOutlined onClick={play} />
      )}
      <StepForwardOutlined onClick={nextSong} />
    </div>
  );
};

export default connect(
  ({ playlist }) => ({
    currentSongPlaying: playlist.currentSongPlaying,
    items: playlist.items,
  }),
  playlistActions
)(ControlPanel);
