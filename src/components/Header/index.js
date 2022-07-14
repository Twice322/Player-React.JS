import React from "react";
import "./Header.scss";
import { Input } from "antd";
import {
  MenuUnfoldOutlined,
  SearchOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { playlistActions } from "../../redux/actions";
import { Popover } from "antd";
import { convertToSeconds } from "../../UTILS";

const Header = ({ items, setFiltered }) => {
  if (!items.length) {
    return null;
  }

  const onFiltered = (value = "") => {
    const newItems = items.filter(
      (song) =>
        song.title.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
        song.title.toLowerCase().indexOf(value.toLowerCase()) >= 0
    );
    setFiltered(newItems);
  };

  const onDurationFiltered = () => {
    const newItems = items.sort((a, b) => {
      const [minutes_a, seconds_a] = a.duration.split(":");
      const [minutes_b, seconds_b] = b.duration.split(":");
      return (
        convertToSeconds(minutes_a, seconds_a) -
        convertToSeconds(minutes_b, seconds_b)
      );
    });
    setFiltered(newItems.slice());
  };

  const onTitleFiltered = () => {
    const newItems = items.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    setFiltered(newItems.slice());
  };

  const onNameFiltered = () => {
    const newItems = items.sort((a, b) => {
      if (a.author < b.author) return -1;
      if (a.author > b.author) return 1;
      return 0;
    });
    setFiltered(newItems.slice());
  };
  const Filter = () => {
    return (
      <>
        <div onClick={onDurationFiltered} className="sort-item">
          Время
        </div>
        <div onClick={onTitleFiltered} className="sort-item">
          Название
        </div>
        <div onClick={onNameFiltered} className="sort-item">
          Имя
        </div>
      </>
    );
  };

  return (
    <>
      <div className="playlist-header">
        <h1>Плейлист</h1>
      </div>
      <div className="playlist-search">
        <Input
          placeholder="Поиск среди медиатеки"
          onChange={(e) => {
            onFiltered(e.target.value);
          }}
        />
        <div className="playlist-search-icons">
          <SearchOutlined />
          <Popover
            placement="rightTop"
            title={"Сортировка"}
            content={<Filter />}
            trigger="click"
            overlayClassName={"customerCSS"}
          >
            <MenuUnfoldOutlined />
          </Popover>
        </div>
      </div>
    </>
  );
};

export default connect(
  ({ playlist }) => ({ items: playlist.items }),
  playlistActions
)(Header);
