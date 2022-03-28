import { Track } from "../redux/music";

export interface TrackContainerProps {
  tracks: Track[];
  searched: Track[];
  getTracks: () => void;
  getFavourites: () => void;
  viewType: string;
}
