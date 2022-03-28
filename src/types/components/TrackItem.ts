import React from "react";
import { ref } from "types/redux/ref";
import { Track } from "../redux/music";

export interface TrackItemProps {
  track: Track;
  index: number;
  refElement: ref;
  getEditedTrack: (track: Track) => void;
  toggleIsEdit: (isEdit: boolean) => void;
  toggleFormView: (isVisible: boolean) => void;
  setPlayer: (
    track: Track,
    index: number,
    e: React.MouseEvent<HTMLDivElement>,
    isLibrary: boolean,
    audioRef: ref,
  ) => void;
}
