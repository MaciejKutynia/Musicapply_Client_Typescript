import { MutableRefObject } from "react";

export interface RefInitialState {
  refElement: ref;
}

export type ref =
  | MutableRefObject<HTMLAudioElement>
  | MutableRefObject<null>
  | null;
