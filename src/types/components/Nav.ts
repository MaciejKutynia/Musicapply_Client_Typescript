export interface NavProps {
  viewType: string;
  libraryIsVisible: boolean;
  toggleViewType: (viewType: string) => void;
  setLoading: () => void;
  hideLoader: () => void;
  searchTracks: (query: string | null) => void;
  getTracks: () => void;
  toggleLibrary: (isVisible: boolean) => void;
  toggleFormView: (isVisible: boolean) => void;
  getEditedTrack: (track: null) => void;
  toggleIsEdit: (isEdit: boolean) => void;
}
