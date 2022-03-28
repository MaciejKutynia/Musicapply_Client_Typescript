import React from "react";
import { connect } from "react-redux";

import { getEditedTrack } from "redux-components/actions/music";
import { toggleFormView, toggleIsEdit } from "redux-components/actions/nav";
import { setPlayer } from "redux-components/actions/player";

//import types
import StoreInitialState from "types/redux";
import { Track } from "types/redux/music";
import { TrackItemProps } from "types/components/TrackItem";

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

//import components
import ToggleHeart from "./ToggleHeart";

const TrackItem: React.FC<TrackItemProps> = (props) => {
  const {
    track,
    index,
    refElement,
    getEditedTrack,
    toggleFormView,
    toggleIsEdit,
    setPlayer,
  } = props;

  const editTrackHandler = (track: Track) => {
    getEditedTrack(track);
    toggleFormView(true);
    toggleIsEdit(true);
  };

  return (
    <div
      className="track-item"
      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
        setPlayer(track, index, e, false, refElement)
      }>
      <ToggleHeart track={track} />
      <FontAwesomeIcon
        icon={faPencilAlt}
        size="2x"
        onClick={editTrackHandler.bind(this, track)}
      />
      <img src={track.cover} alt={`${track.artist} ${track.name}`} />
      <div className="track-info">
        <h4>{track.artist}</h4>
        <span>-</span>
        <p>{track.name}</p>
      </div>
    </div>
  );
};

const mapStateToDispatch = {
  getEditedTrack,
  toggleFormView,
  toggleIsEdit,
  setPlayer,
};

const mapStateToProps = ({ ref }: StoreInitialState) => {
  const { refElement } = ref;
  return { refElement };
};

export default connect(mapStateToProps, mapStateToDispatch)(TrackItem);
