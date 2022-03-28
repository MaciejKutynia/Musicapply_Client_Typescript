import { AnyAction } from "redux";

import {
  TOGGLE_VIEW,
  TOGGLE_FORM_VISIBLE,
  TOGGLE_EDIT,
} from "../constants/nav";

import { VIEW_ENUM } from "../../types/redux/nav";

const initialState = {
  viewType: VIEW_ENUM.GRID,
  formIsVisible: false,
  isEdit: false,
};

const navReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case TOGGLE_VIEW:
      return {
        ...state,
        viewType: action.viewType,
      };
    case TOGGLE_FORM_VISIBLE:
      return {
        ...state,
        formIsVisible: action.isVisible,
      };
    case TOGGLE_EDIT:
      return {
        ...state,
        isEdit: action.isEdit,
      };
    default:
      return state;
  }
};

export default navReducer;
