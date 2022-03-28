import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

//import types
import StoreInitialState from "types/redux";
import { ToggleHeartProps } from "types/components/ToggleHeart";

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

//import functions
import { deleteFavourite, setFavourites } from "redux-components/actions/music";

const ToggleHeart: React.FC<ToggleHeartProps> = (props) => {
  const { favourites, setFavourites, track, deleteFavourite } = props;

  const [favouritesState, setFavouritesState] = useState(false);

  useEffect(() => {
    favourites.filter(
      (song) => song._id === track._id && setFavouritesState(true),
    );
  }, [favourites]);

  const favouriteHandler = async () => {
    setFavouritesState(!favouritesState);
    if (!favouritesState) {
      setFavourites(track);
      return;
    }
    deleteFavourite(track);
  };

  return (
    <FontAwesomeIcon
      icon={favouritesState ? fullHeart : emptyHeart}
      size="2x"
      onClick={favouriteHandler}
    />
  );
};

const mapStateToProps = ({ music }: StoreInitialState) => {
  const { favourites } = music;
  return { favourites };
};

const mapStateToDispatch = {
  setFavourites,
  deleteFavourite,
};

export default connect(mapStateToProps, mapStateToDispatch)(ToggleHeart);
