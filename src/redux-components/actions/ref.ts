import { MutableRefObject } from "react";
import { Dispatch } from "redux";
import { SET_REF } from "../constants/ref";
import { ref } from "../../types/redux/ref";

export const setRef = (ref: ref) => async (dispatch: Dispatch) => {
  dispatch({ type: SET_REF, ref });
};
