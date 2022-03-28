export enum VIEW_ENUM {
  GRID = "grid",
  LIST = "list",
}

export interface NavInitialState {
  viewType: string;
  formIsVisible: boolean;
  isEdit: boolean;
}
