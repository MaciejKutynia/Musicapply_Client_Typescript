import React, { useState } from "react";
import { connect } from "react-redux";

import {
  toggleOpenPlayer,
  anotherSongHandler,
  toggleLoop,
} from "redux-components/actions/player";

import { getTime } from "utils/timeHandlers";

//import types
import StoreInitialState from "types/redux";
import { PlayerProps } from "types/components/Player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Direction } from "types/redux/player";

import {
  faPause,
  faPlay,
  faRedo,
  faStepBackward,
  faStepForward,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

const Player: React.FC<PlayerProps> = (props) => {
  const {
    isFromLibrary,
    playerIsVisible,
    playerIsOpen,
    track,
    refElement,
    trackCurrentTime,
    trackDuration,
    trackPercentage,
    isLoop,
    toggleLoop,
    toggleOpenPlayer,
    anotherSongHandler,
  } = props;

  const [volumeInputVisible, setVolumeInputVisible] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMute, setIsMute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const volumeIconHandler = () => {
    setIsMute(!isMute);
    const isMuteTemp = !isMute;
    if (isMuteTemp) {
      if (refElement && refElement.current) {
        refElement.current.volume = 0;
      }
      return;
    }
    if (refElement && refElement.current) {
      refElement.current.volume = volume;
    }
  };

  const toggleHandler = () => {
    toggleOpenPlayer(!playerIsOpen);
  };

  const volumeHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.currentTarget.value));
    setIsMute(false);
    if (refElement && refElement.current) {
      refElement.current.volume = volume;
    }
  };

  const volumeDragHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.currentTarget.value));
    setIsMute(false);
    if (refElement && refElement.current) {
      refElement.current.volume = volume;
    }
  };

  const playSongHandler = () => {
    if (track?.src) {
      const isPlayingTemp = isPlaying;
      setIsPlaying(!isPlaying);
      if (isPlayingTemp) {
        if (refElement && refElement.current) {
          refElement.current.play();
          return;
        }
      }
      if (refElement && refElement.current) {
        refElement.current.pause();
      }
    }
  };

  const anotherSong = (direction: string) => {
    setIsPlaying(false);
    anotherSongHandler(isFromLibrary, direction);
  };

  const dragHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (refElement?.current) {
      refElement.current.currentTime = parseFloat(e.currentTarget.value);
    }
  };

  const trackAnim = {
    left: `${-100 + trackPercentage}%`,
  };

  return (
    <div
      className={`player ${
        playerIsVisible ? (playerIsOpen ? "" : "hidden") : "none"
      }`}>
      <div className="cover">
        <img src={track?.cover} alt={track?.name} onClick={toggleHandler} />
      </div>
      <div className="track-info">
        <h4>{track?.artist}</h4>
        <p>{track?.name}</p>
      </div>
      <div className="track-time">
        <p id="current-time">
          {trackCurrentTime ? getTime(trackCurrentTime) : "0:00"}
        </p>
        <div className="track">
          <input
            type="range"
            id="track-time-input"
            onChange={dragHandler}
            min={0}
            max={trackDuration || 0}
            value={trackCurrentTime || 0}
          />
        </div>
        <p id="end-time">{trackDuration ? getTime(trackDuration) : "0:00"}</p>
      </div>
      <div className="controls">
        <FontAwesomeIcon
          icon={faStepBackward}
          size="2x"
          className="icon"
          onClick={anotherSong.bind(this, Direction.BACK)}
        />
        <div id="volume">
          <FontAwesomeIcon
            icon={isMute ? faVolumeMute : faVolumeUp}
            size="2x"
            className={`icon ${isMute ? "mute" : ""}`}
            onMouseEnter={(e: React.MouseEvent<SVGSVGElement>) =>
              setVolumeInputVisible(true)
            }
            onMouseLeave={(e: React.MouseEvent<SVGSVGElement>) =>
              setVolumeInputVisible(false)
            }
            onClick={volumeIconHandler}
          />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            className={volumeInputVisible ? "visible" : ""}
            onClick={volumeHandler}
            onChange={volumeDragHandler}
            onMouseEnter={(e: React.MouseEvent<HTMLInputElement>) =>
              setVolumeInputVisible(true)
            }
            onMouseLeave={(e: React.MouseEvent<HTMLInputElement>) =>
              setVolumeInputVisible(false)
            }
          />
        </div>
        <FontAwesomeIcon
          icon={isPlaying ? faPlay : faPause}
          onClick={playSongHandler}
          size="2x"
          className="icon"
        />
        <FontAwesomeIcon
          icon={faStepForward}
          size="2x"
          className="icon"
          onClick={anotherSong.bind(this, Direction.NEXT)}
        />
        <FontAwesomeIcon
          icon={faRedo}
          size="2x"
          className={`icon ${isLoop ? "loop" : ""}`}
          onClick={toggleLoop.bind(this, !isLoop)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ player, music, ref }: StoreInitialState) => {
  const {
    playerIsVisible,
    playerIsOpen,
    isFromLibrary,
    trackCurrentTime,
    trackDuration,
    trackPercentage,
    isLoop,
  } = player;
  const { track } = music;
  const { refElement } = ref;
  return {
    playerIsVisible,
    playerIsOpen,
    track,
    refElement,
    isFromLibrary,
    trackCurrentTime,
    trackDuration,
    trackPercentage,
    isLoop,
  };
};

const mapStateToDispatch = {
  toggleOpenPlayer,
  anotherSongHandler,
  toggleLoop,
};

export default connect(mapStateToProps, mapStateToDispatch)(Player);
