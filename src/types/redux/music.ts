export interface MusicInitialState {
  tracks: Track[];
  track: Track | null;
  isLoading: boolean;
  searched: Track[];
  error: any;
  isPlayed: boolean;
  favourites: Track[];
  libraryIsVisible: boolean;
  editedTrack: Track | null;
}

export interface Track {
  _id: string;
  src: any;
  cover: any;
  artist: string;
  name: string;
}
