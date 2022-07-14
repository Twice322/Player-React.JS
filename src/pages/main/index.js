import React, { useEffect, useState } from "react";
import Playlist from "../../components/Playlist";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { playlistActions } from "../../redux/actions";

const Main = ({ items }) => {
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    setFiltered(items);
  }, [items]);

  console.log(filtered);
  return (
    <>
      <Header setFiltered={setFiltered} />
      <Playlist items={filtered} />
    </>
  );
};

export default connect(
  ({ playlist }) => ({ items: playlist.items }),
  playlistActions
)(Main);
