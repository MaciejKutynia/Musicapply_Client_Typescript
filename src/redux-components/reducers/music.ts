import { MusicInitialState } from "../../types/redux/music";

import {
  GET_TRACKS,
  ERROR,
  GET_SRC,
  IS_LOADING,
  SEARCHED_TRACKS,
  GET_FAV,
  IS_PLAYING,
  TOGGLE_LIBRARY,
  GET_EDITED_TRACK,
} from "../constants/music";

import { AnyAction } from "redux";

const initialState: MusicInitialState = {
  tracks: [],
  error: {},
  track: null,
  isLoading: false,
  searched: [],
  isPlayed: false,
  favourites: [],
  libraryIsVisible: false,
  editedTrack: null,
};

const musicReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_TRACKS:
      return {
        ...state,
        tracks: action.tracks,
        isLoading: false,
      };
    case GET_SRC:
      return {
        ...state,
        track: action.track,
      };
    case ERROR:
      return {
        ...state,
      };
    case SEARCHED_TRACKS:
      return {
        ...state,
        searched: action.searched,
        isLoading: false,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case IS_PLAYING:
      return {
        ...state,
        isPlayed: action.isPlaying,
      };
    case GET_FAV:
      return {
        ...state,
        favourites: action.favourites,
      };
    case TOGGLE_LIBRARY:
      return {
        ...state,
        libraryIsVisible: action.isVisible,
      };
    case GET_EDITED_TRACK:
      return {
        ...state,
        editedTrack: action.track,
      };
    default:
      return state;
  }
};

export default musicReducer;
