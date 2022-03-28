import React, { useEffect } from "react";

import { connect } from "react-redux";
import StoreInitialState from "types/redux";

//import types
import { TrackContainerProps } from "types/components/TrackContainer";

//import components
import TrackItem from "../utils/TrackItem";

//import functions
import { getTracks, getFavourites } from "redux-components/actions/music";

const TracksContainer: React.FC<TrackContainerProps> = (props) => {
  const { tracks, getTracks, getFavourites, searched, viewType } = props;

  useEffect(() => {
    getTracks();
    getFavourites();
  }, []);

  return (
    <div
      className={
        viewType === "grid" ? "tracks-container" : "tracks-container list"
      }>
      {searched?.length ? (
        <>
          {searched?.map((track, index) => (
            <TrackItem track={track} index={index} key={track._id} />
          ))}
        </>
      ) : (
        <>
          {tracks?.map((track, index) => (
            <TrackItem track={track} index={index} key={track._id} />
          ))}
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ music, nav }: StoreInitialState) => {
  const { tracks, searched } = music;
  const { viewType } = nav;
  return { tracks, searched, viewType };
};

const mapDispatchToProps = {
  getTracks,
  getFavourites,
};

export default connect(mapStateToProps, mapDispatchToProps)(TracksContainer);
