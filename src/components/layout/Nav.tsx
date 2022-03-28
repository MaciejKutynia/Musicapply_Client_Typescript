import React, { useState } from "react";
import { connect } from "react-redux";

import {
  toggleFormView,
  toggleViewType,
  toggleIsEdit,
} from "redux-components/actions/nav";
import {
  hideLoader,
  setLoading,
  searchTracks,
  getTracks,
  toggleLibrary,
  getEditedTrack,
} from "redux-components/actions/music";

//import icons
import {
  faHeart,
  faImages,
  faList,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import images
import logo from "assets/images/headphones.png";

//import types
import StoreInitialState from "types/redux/index";
import { NavProps } from "types/components/Nav";
import { VIEW_ENUM } from "types/redux/nav";

const Nav: React.FC<NavProps> = (props) => {
  const {
    viewType,
    libraryIsVisible,
    toggleViewType,
    setLoading,
    hideLoader,
    searchTracks,
    getTracks,
    toggleLibrary,
    toggleFormView,
    toggleIsEdit,
    getEditedTrack,
  } = props;

  const [query, setQuery] = useState<string>("");

  const toggleViewHandler = () => {
    if (viewType === VIEW_ENUM.GRID) {
      toggleViewType(VIEW_ENUM.LIST);
      return;
    }
    toggleViewType(VIEW_ENUM.GRID);
  };

  const searchHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    (document.querySelector(".search input") as HTMLInputElement).value = "";
    setLoading();
    if (query) {
      await searchTracks(query);
      return;
    }
    hideLoader();
  };

  const clickLogoHandler = () => {
    searchTracks(null);
    getTracks();
  };

  const toggleLibraryHandler = () => {
    toggleLibrary(!libraryIsVisible);
  };

  return (
    <header>
      <button className="btn fav" onClick={toggleLibraryHandler}>
        Ulubione
        <FontAwesomeIcon icon={faHeart} size="2x" />
      </button>
      <button
        className="btn add"
        onClick={() => {
          toggleFormView(true);
          getEditedTrack(null);
          toggleIsEdit(false);
        }}>
        Dodaj
        <FontAwesomeIcon icon={faPlus} size="2x" />
      </button>
      <img
        src={logo}
        alt="Musicapply"
        className="logo"
        onClick={clickLogoHandler}
      />
      <button className="btn list" onClick={toggleViewHandler}>
        <FontAwesomeIcon icon={viewType === "list" ? faImages : faList} />
        {viewType === "list" ? "Siatka" : "Lista"}
      </button>
      <form className="search">
        <input
          type="search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.currentTarget.value)
          }
        />
        <button onClick={searchHandler}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </header>
  );
};

const mapStateToProps = ({ nav, music }: StoreInitialState) => {
  const { viewType } = nav;
  const { libraryIsVisible } = music;
  return { viewType, libraryIsVisible };
};

const mapStateToDispatch = {
  toggleViewType,
  setLoading,
  hideLoader,
  searchTracks,
  getTracks,
  toggleLibrary,
  toggleFormView,
  getEditedTrack,
  toggleIsEdit,
};

export default connect(mapStateToProps, mapStateToDispatch)(Nav);
