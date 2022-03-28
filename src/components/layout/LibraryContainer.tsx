import React from "react";
import { connect } from "react-redux";

//import types
import { LibraryProps } from "types/components/LibraryContainer";
import StoreInitialState from "types/redux";

//import components
import TrackItem from "components/utils/TrackItem";

const LibraryContainer: React.FC<LibraryProps> = (props) => {
  const { favourites, libraryIsVisible, viewType } = props;
  return (
    <div
      className={
        libraryIsVisible
          ? viewType === "grid"
            ? "library-container active"
            : "library-container active list"
          : "library-container"
      }>
      {favourites?.map((track, index) => (
        <TrackItem track={track} index={index} key={track._id} />
      ))}
    </div>
  );
};

const mapStateToProps = ({ music, nav }: StoreInitialState) => {
  const { favourites, libraryIsVisible } = music;
  const { viewType } = nav;
  return { favourites, libraryIsVisible, viewType };
};

export default connect(mapStateToProps)(LibraryContainer);
