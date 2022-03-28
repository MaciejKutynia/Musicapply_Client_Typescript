import { Track } from "../redux/music";

export interface ToggleHeartProps {
  favourites: Track[];
  setFavourites: (track: Track) => void;
  track: Track;
  deleteFavourite: (track: Track) => void;
}
