import { Track } from "types/redux/music";

export interface FormProps {
  formIsVisible: boolean;
  isEdit: boolean;
  editedTrack: Track | null;
  toggleFormView: (isVisible: boolean) => void;
  toggleIsEdit: (isEdit: boolean) => void;
  saveNewTrack: (track: Track) => void;
  editTrack: (track: Track) => void;
  setLoading: () => void;
  hideLoader: () => void;
}
