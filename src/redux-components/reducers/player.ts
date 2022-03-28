import { AnyAction } from "redux";
import { PlayerInitialState } from "../../types/redux/player";

import {
  PLAYER_OPEN,
  PLAYER_VISIBILITY,
  TOGGLE_IS_FROM_LIBRARY,
  TOGGLE_IS_PLAYING,
  SET_SONG_INDEX,
  UPDATE_CURRENT_TIME,
  UPDATE_DURATION,
  TOGGLE_LOOP,
} from "../constants/player";

const initialState: PlayerInitialState = {
  playerIsVisible: false,
  playerIsOpen: false,
  isFromLibrary: false,
  isPlaying: false,
  songIndex: 0,
  trackCurrentTime: 0,
  trackDuration: 0,
  trackPercentage: 0,
  isLoop: false,
};

const playerReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case PLAYER_VISIBILITY:
      return {
        ...state,
        playerIsVisible: action.isVisible,
      };
    case PLAYER_OPEN:
      return {
        ...state,
        playerIsOpen: action.isOpen,
      };
    case TOGGLE_IS_FROM_LIBRARY:
      return {
        ...state,
        isFromLibrary: action.isFromLibrary,
      };
    case TOGGLE_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    case SET_SONG_INDEX:
      return {
        ...state,
        songIndex: action.index,
      };
    case UPDATE_CURRENT_TIME:
      return {
        ...state,
        trackCurrentTime: action.currentTime,
        trackPercentage: action.percentage,
      };
    case UPDATE_DURATION:
      return {
        ...state,
        trackDuration: action.duration,
      };
    case TOGGLE_LOOP:
      return {
        ...state,
        isLoop: action.isLoop,
      };
    default:
      return state;
  }
};

export default playerReducer;
