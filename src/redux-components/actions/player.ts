import React from "react";

import { AnyAction, Dispatch } from "redux";
import {
  PLAYER_OPEN,
  PLAYER_VISIBILITY,
  SET_SONG_INDEX,
  TOGGLE_IS_FROM_LIBRARY,
  TOGGLE_LOOP,
  UPDATE_CURRENT_TIME,
  UPDATE_DURATION,
} from "../constants/player";

//types
import { Track } from "types/redux/music";
import { ref } from "types/redux/ref";
import axios from "axios";
import baseURL from "utils/config";
import { GET_SRC } from "redux-components/constants/music";
import StoreInitialState from "types/redux";
import { Direction } from "types/redux/player";

export const playerVisibility =
  (isVisible: boolean) => async (dispatch: Dispatch) => {
    dispatch({ type: PLAYER_VISIBILITY, isVisible });
  };

export const toggleOpenPlayer =
  (isOpen: boolean) => async (dispatch: Dispatch) => {
    dispatch({ type: PLAYER_OPEN, isOpen });
  };

export const toggleFromLibrary =
  (isFromLibrary: boolean) => async (dispatch: Dispatch) => {
    dispatch({ type: TOGGLE_IS_FROM_LIBRARY, isFromLibrary });
  };

export const setTrack = (track: Track) => async (dispatch: Dispatch) => {
  const res = await axios.post(`${baseURL}/track`, { id: track._id });
  dispatch({ type: GET_SRC, track: { ...track, src: res.data.src } });
};

export const stopPlayer = (audioRef: ref) => async (dispatch: Dispatch) => {
  if (audioRef && audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }
};

export const setPlayer =
  (
    track: Track,
    index: number,
    e: React.MouseEvent<HTMLDivElement>,
    isLibrary: boolean,
    audioRef: ref,
  ) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: PLAYER_OPEN, isOpen: true });
    toggleFromLibrary(isLibrary);
    if (
      !e.currentTarget.classList.contains("fa-pencil-alt") &&
      !e.currentTarget.classList.contains("fa-heart")
    ) {
      dispatch<any>(stopPlayer(audioRef));
      dispatch({ type: PLAYER_VISIBILITY, isVisible: true });
      dispatch<any>(setTrack(track));
      dispatch<any>(setIndex(index));
    }
  };

export const setIndex = (index: number) => async (dispatch: Dispatch) => {
  dispatch({ type: SET_SONG_INDEX, index });
};

export const anotherSongHandler =
  (library: boolean, direction: string) =>
  async (dispatch: Dispatch, getState: () => StoreInitialState) => {
    const audioRef = getState().ref.refElement;
    const favourites = getState().music.favourites;
    const tracks = getState().music.tracks;
    const songIndex = getState().player.songIndex;

    if (audioRef && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (direction === Direction.BACK) {
      dispatch<any>(
        setIndex(
          library
            ? songIndex > 0
              ? songIndex - 1
              : favourites.length - 1
            : songIndex > 0
            ? songIndex - 1
            : tracks.length - 1,
        ),
      );
      dispatch<any>(
        setTrack(library ? favourites[songIndex] : tracks[songIndex]),
      );
      return;
    }
    dispatch<any>(
      setIndex(
        library
          ? songIndex < favourites.length
            ? songIndex + 1
            : 0
          : songIndex < tracks.length
          ? songIndex + 1
          : 0,
      ),
    );
    dispatch<any>(
      setTrack(library ? favourites[songIndex] : tracks[songIndex]),
    );
  };

export const updateTrackTime =
  (currentTime: number, percentage: number) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_CURRENT_TIME, currentTime, percentage });
  };

export const updateTrackDuration =
  (duration: number) => async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_DURATION, duration });
  };

export const toggleLoop = (isLoop: boolean) => async (dispatch: Dispatch) => {
  dispatch({ type: TOGGLE_LOOP, isLoop });
};
