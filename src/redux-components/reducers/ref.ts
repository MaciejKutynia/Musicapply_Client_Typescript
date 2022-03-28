import { AnyAction } from "redux";

import { SET_REF } from "../constants/ref";

import { RefInitialState } from "../../types/redux/ref";

const initialState: RefInitialState = {
  refElement: null,
};

const refReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_REF:
      return {
        ...state,
        ref: action.ref,
      };
    default:
      return state;
  }
};

export default refReducer;
