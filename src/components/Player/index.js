import React, { useEffect, useRef, useState } from "react";
import "./Player.scss";
import ControlPanel from "../ControlPanel";
import { SoundOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { playerActions } from "../../redux/actions";
import { secondsToHms } from "../../UTILS";
import { removeActiveClasses } from "../../UTILS";
const Player = ({
  src,
  position,
  percentage,
  duration,
  isPlaying,
  currentTime,
  volume,
  progressBarWidth,
  setPosition,
  setProgressBarWidth,
  setPercentage,
  setIsPlaying,
  setCurrentTime,
  setDuration,
  selectedSong,
  setVolume,
}) => {
  const rangeRef = useRef();
  const thumbRef = useRef();
  const audioRef = useRef();
  const [marginLeft, setMarginLeft] = useState(0);

  useEffect(() => {
    const rangeWidth = rangeRef.current.getBoundingClientRect().width;
    const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const centerThumb = (thumbWidth / 100) * percentage * -1;

    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * percentage -
      (thumbWidth / 100) * percentage;
    setMarginLeft(centerThumb);
    setPosition(percentage);
    setProgressBarWidth(centerProgressBar);
  }, [percentage, setProgressBarWidth, setPosition]);

  useEffect(() => {
    setIsPlaying(true);
    const dialogItems = document.querySelectorAll(".item");
    removeActiveClasses();
    dialogItems.forEach((dialog) => {
      if (dialog.getAttribute("data-key") === selectedSong.id) {
        dialog.classList.add("active");
      }
    });
  }, [src, setIsPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  });

  const onChange = (e) => {
    audioRef.current.currentTime =
      (audioRef.current.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const play = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      audioRef.current.play();
    }
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
    }
  };

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;
    setPercentage(percent);
    setCurrentTime(time.toFixed(2));
  };
  const onVolumeChange = (e) => {
    setVolume(e.target.value / 100);
  };
  return (
    <div className="player">
      <div className="player-slider">
        <div
          className="player-slider-progress-bar"
          style={{ width: `${progressBarWidth}px` }}
        ></div>
        <div
          className="player-slider-thumb"
          style={{ left: `${position}%`, marginLeft: `${marginLeft}px` }}
          ref={thumbRef}
        ></div>
        <input
          type="range"
          step={"0.01"}
          value={position}
          ref={rangeRef}
          onChange={onChange}
        />
      </div>
      <div className="player-bar">
        <div className="player-bar-left">
          <ControlPanel
            play={play}
            isPlaying={isPlaying}
            duration={duration}
            currentTime={currentTime}
            selectedSong={selectedSong}
          />
          <div className="player-bar-left-info">
            <div className="player-bar-left-info--avatar">
              <img src={selectedSong.image} alt={"song cover"} />
            </div>
            <div className="player-bar-left-info--title">
              <span>{selectedSong.title}</span>
              <div className="player-bar-left-info--author">
                {selectedSong.author}
              </div>
            </div>
          </div>
        </div>
        <div className="player-music">
          <audio
            ref={audioRef}
            onTimeUpdate={getCurrDuration}
            onLoadedData={(e) => {
              setDuration(e.currentTarget.duration.toFixed(2));
            }}
            src={src}
          />
          {secondsToHms(currentTime)} / {selectedSong.duration}
        </div>
        <div className="player-volume">
          <SoundOutlined />
          <input type="range" onChange={onVolumeChange} value={volume * 100} />
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({ player }) => ({
    isPlaying: player.isPlaying,
    position: player.position,
    duration: player.duration,
    percentage: player.percentage,
    currentTime: player.currentTime,
    volume: player.volume,
    progressBarWidth: player.progressBarWidth,
    audio: player.audio,
  }),
  playerActions
)(Player);
