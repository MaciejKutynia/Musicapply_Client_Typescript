import { combineReducers } from "redux";
import Music from "./music";
import Ref from "./ref";
import Player from "./player";
import Nav from "./nav";

const rootReducer = combineReducers({
  music: Music,
  ref: Ref,
  player: Player,
  nav: Nav,
});
export default rootReducer;
