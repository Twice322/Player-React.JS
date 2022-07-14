import React, { useEffect } from "react";
import "./Playlist.scss";
import PlaylistItem from "../PlaylistItem";
import Player from "../Player";
import { connect } from "react-redux";
import { playlistActions } from "../../redux/actions";

const Playlist = ({
  items,
  fetchPlaylist,
  currentSongPlaying,
  setCurrentSong,
}) => {
  useEffect(() => {
    fetchPlaylist();
  }, []);
  const [selectedSong] = items.filter((song) => song.id == currentSongPlaying);

  console.log(items);

  return (
    <div className="playlist">
      <div>
        {items.length ? (
          items.map((song) => {
            return (
              <PlaylistItem
                {...song}
                key={song.id}
                setCurrentSong={setCurrentSong}
                currentSongPlaying={currentSongPlaying}
              />
            );
          })
        ) : (
          <div>Ничего не найдено</div>
        )}
      </div>
      {currentSongPlaying && selectedSong && (
        <Player {...selectedSong} selectedSong={selectedSong} />
      )}
    </div>
  );
};

export default connect(
  ({ playlist }) => ({
    currentSongPlaying: playlist.currentSongPlaying,
  }),
  playlistActions
)(Playlist);
