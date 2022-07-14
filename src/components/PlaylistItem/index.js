import React, { useEffect } from "react";
import "./PlaylistItem.scss";
import { connect } from "react-redux";
import { playerActions } from "../../redux/actions";
import { addActiveClass } from "../../UTILS";

const PlaylistItem = ({
  image,
  id,
  title,
  author,
  duration,
  setCurrentSong,
  setIsPlaying,
  setPosition,
  setCurrentTime,
  setProgressBarWidth,
  isPlaying,
  currentSongPlaying,
}) => {
  useEffect(() => {
    setPosition(0);
    setCurrentTime(0);
    setProgressBarWidth(0);
  }, [
    currentSongPlaying,
    id,
    setCurrentTime,
    setPosition,
    setProgressBarWidth,
  ]);
  return (
    <div
      className="item"
      onClick={(e) => {
        setCurrentSong(id);
        addActiveClass(e);
        if (isPlaying) {
          setIsPlaying(false);
        }
        if (!isPlaying) {
          setIsPlaying(true);
        }
      }}
      data-key={id}
    >
      <div className="item-info">
        <img className="item-info-avatar" src={image} alt={"Обложка трека"} />
        <div className="item-info-title">{title}</div>
      </div>
      <div className="item-author">{author}</div>
      <div className="item-duration">{duration}</div>
    </div>
  );
};

export default connect(
  ({ player }) => ({
    isPlaying: player.isPlaying,
  }),
  playerActions
)(PlaylistItem);
