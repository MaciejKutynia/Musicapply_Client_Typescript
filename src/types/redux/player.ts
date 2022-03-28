export interface PlayerInitialState {
  playerIsVisible: boolean;
  playerIsOpen: boolean;
  isFromLibrary: boolean;
  isPlaying: boolean;
  songIndex: number;
  trackCurrentTime: number;
  trackDuration: number;
  trackPercentage: number;
  isLoop: boolean;
}

export enum Direction {
  NEXT = "next",
  BACK = "back",
}
