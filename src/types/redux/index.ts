import { MusicInitialState } from "./music";
import { NavInitialState } from "./nav";
import { PlayerInitialState } from "./player";
import { RefInitialState } from "./ref";

export default interface StoreInitialState {
  music: MusicInitialState;
  nav: NavInitialState;
  player: PlayerInitialState;
  ref: RefInitialState;
}
