import { Track } from "types/redux/music";
import { ref } from "types/redux/ref";

export interface PlayerProps {
  playerIsVisible: boolean;
  playerIsOpen: boolean;
  isFromLibrary: boolean;
  trackCurrentTime: number;
  trackDuration: number;
  trackPercentage: number;
  track: Track | null;
  refElement: ref;
  isLoop: boolean;
  toggleLoop: (isLoop: boolean) => void;
  toggleOpenPlayer: (isOpen: boolean) => void;
  anotherSongHandler: (library: boolean, direction: string) => void;
}
