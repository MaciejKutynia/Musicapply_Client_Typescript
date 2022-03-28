import { ref } from "../redux/ref";
import { Track } from "types/redux/music";

export interface AppProps {
  playerIsOpen: boolean;
  track: Track | null;
  isLoop: boolean;
  refElement: ref;
  isFromLibrary: boolean;
  setRef: (ref: ref) => void;
  updateTrackTime: (currentTime: number, percentage: number) => void;
  updateTrackDuration: (duration: number) => void;
  anotherSongHandler: (library: boolean, direction: string) => void;
  toggleOpenPlayer: (isOpen: boolean) => void;
}
