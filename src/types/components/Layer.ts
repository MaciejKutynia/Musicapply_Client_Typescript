export interface LayerProps {
  formIsVisible: boolean;
  playerIsOpen: boolean;
  toggleFormView: (isVisible: boolean) => void;
  toggleOpenPlayer: (isOpen: boolean) => void;
}
