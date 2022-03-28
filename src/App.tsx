import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";

//import types
import { AppProps } from "types/components/App";
import StoreInitialState from "types/redux";

import { getPercentage } from "utils/timeHandlers";

//import functions
import { setRef } from "redux-components/actions/ref";
import {
  updateTrackDuration,
  updateTrackTime,
  anotherSongHandler,
  toggleOpenPlayer,
} from "redux-components/actions/player";

//import styles
import "./assets/styles/app.scss";

//import components
import LandingPage from "components/layout/LandingPage";
import TracksContainer from "components/layout/TracksContainer";
import Nav from "components/layout/Nav";
import Loading from "components/utils/Loading";
import LibraryContainer from "components/layout/LibraryContainer";
import Form from "components/utils/Form";
import Layer from "components/utils/Layer";
import Player from "components/layout/Player";
import { Direction } from "types/redux/player";

const App: React.FC<AppProps> = (props) => {
  const {
    playerIsOpen,
    track,
    isLoop,
    refElement,
    isFromLibrary,
    setRef,
    updateTrackTime,
    updateTrackDuration,
    anotherSongHandler,
    toggleOpenPlayer,
  } = props;
  const audioRef = useRef(null);

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setRef(audioRef);
  }, [audioRef]);

  const timeUpdateHandler = (e: any) => {
    const trackCurrentTime = parseFloat(e.currentTarget.currentTime);
    const trackDuration = parseFloat(e.currentTarget.duration);
    setPercentage(getPercentage(trackCurrentTime, trackDuration));
    updateTrackTime(trackCurrentTime, percentage);
    updateTrackDuration(trackDuration);
  };

  const onEndedHandler = (e: any) => {
    if (isLoop) {
      if (refElement?.current) {
        refElement.current.currentTime = 0;
        refElement.current.play();
      }
      return;
    }
    anotherSongHandler(isFromLibrary, Direction.NEXT);
  };

  return (
    <div className="App">
      <Loading />
      <LandingPage />
      <Nav />
      <Layer />
      <Form />
      <div
        className="container"
        style={
          playerIsOpen ? { pointerEvents: "none" } : { pointerEvents: "all" }
        }>
        <TracksContainer />
        <LibraryContainer />
      </div>
      <Player />
      <audio
        src={track?.src}
        ref={audioRef}
        onEnded={onEndedHandler}
        onTimeUpdate={timeUpdateHandler}></audio>
    </div>
  );
};

const mapStateToDispatch = {
  setRef,
  updateTrackTime,
  updateTrackDuration,
  anotherSongHandler,
  toggleOpenPlayer,
};

const mapStateToProps = ({ player, music, ref }: StoreInitialState) => {
  const { playerIsOpen, isLoop, isFromLibrary } = player;
  const { track } = music;
  const { refElement } = ref;
  return { playerIsOpen, track, isLoop, refElement, isFromLibrary };
};

export default connect(mapStateToProps, mapStateToDispatch)(App);
