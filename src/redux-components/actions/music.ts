import axios from "axios";
import { Dispatch } from "redux";
import {
  GET_EDITED_TRACK,
  GET_FAV,
  GET_TRACKS,
  IS_LOADING,
  TOGGLE_LIBRARY,
} from "../constants/music";
import baseURL from "utils/config";
import { Track } from "types/redux/music";
import StoreInitialState from "types/redux";

export const getTracks = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(`${baseURL}/`);
    dispatch({
      type: GET_TRACKS,
      tracks: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFavourites = () => async (dispatch: Dispatch) => {
  let playlist: Track[] = [];
  if (localStorage.getItem("playlist")) {
    playlist = JSON.parse(localStorage.getItem("playlist") || "");
  }
  dispatch({ type: GET_FAV, favourites: playlist });
};

export const setFavourites =
  (track: Track) =>
  async (dispatch: Dispatch, getState: () => StoreInitialState) => {
    const favourites = getState().music.favourites;
    favourites.push(track);
    localStorage.removeItem("playlist");
    localStorage.setItem("playlist", JSON.stringify(favourites));
    dispatch({ type: GET_FAV, favourites });
  };

export const deleteFavourite =
  (track: Track) =>
  async (dispatch: Dispatch, getState: () => StoreInitialState) => {
    const favourites = getState().music.favourites;
    let playlist;
    const id = track._id;
    playlist = favourites.filter((song: Track) => song._id !== id);
    localStorage.removeItem("playlist");
    localStorage.setItem("playlist", JSON.stringify(playlist));
    dispatch({ type: GET_FAV, favourites });
  };

export const searchTracks =
  (query: string | null) => async (dispatch: Dispatch) => {
    try {
      if (query === null) {
        dispatch({
          type: "SEARCHED_TRACKS",
          searched: null,
        });
        return;
      }
      const res = await axios.get(`${baseURL}/search/${query}`);
      dispatch({
        type: "SEARCHED_TRACKS",
        searched: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const setLoading = () => async (dispatch: Dispatch) => {
  dispatch({ type: IS_LOADING, isLoading: true });
};

export const hideLoader = () => async (dispatch: Dispatch) => {
  dispatch({ type: IS_LOADING, isLoading: false });
};

export const toggleLibrary = (isVisible: boolean) => (dispatch: Dispatch) => {
  dispatch({ type: TOGGLE_LIBRARY, isVisible });
};

export const getEditedTrack =
  (track: Track | null) => async (dispatch: Dispatch) => {
    dispatch({ type: GET_EDITED_TRACK, track });
  };

export const saveNewTrack = (track: Track) => async (dispatch: Dispatch) => {
  await axios.post(`${baseURL}/new`, { file: track });
  await getTracks();
};
export const editTrack = (track: Track) => async (dispatch: Dispatch) => {
  await axios.post(`${baseURL}/edit`, { file: track });
  await getTracks();
};
