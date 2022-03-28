import { Track } from "types/redux/music";

export interface LibraryProps {
  favourites: Track[];
  libraryIsVisible: boolean;
  viewType: string;
}
