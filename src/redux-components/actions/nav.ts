import { Dispatch } from "redux";
import {
  TOGGLE_EDIT,
  TOGGLE_FORM_VISIBLE,
  TOGGLE_VIEW,
} from "../constants/nav";

export const toggleViewType =
  (viewType: string) => async (dispatch: Dispatch) => {
    dispatch({ type: TOGGLE_VIEW, viewType });
  };

export const toggleFormView =
  (isVisible: boolean) => async (dispatch: Dispatch) => {
    dispatch({ type: TOGGLE_FORM_VISIBLE, isVisible });
  };

export const toggleIsEdit = (isEdit: boolean) => async (dispatch: Dispatch) => {
  dispatch({ type: TOGGLE_EDIT, isEdit });
};
