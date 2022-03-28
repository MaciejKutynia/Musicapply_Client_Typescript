import React from "react";
import { connect } from "react-redux";

import { toggleFormView } from "redux-components/actions/nav";
import { toggleOpenPlayer } from "redux-components/actions/player";

//import types
import { LayerProps } from "types/components/Layer";
import StoreInitialState from "types/redux";

const Layer: React.FC<LayerProps> = (props) => {
  const { formIsVisible, playerIsOpen, toggleFormView, toggleOpenPlayer } =
    props;

  const hideFormHandler = () => {
    toggleFormView(false);
  };

  const hidePlayerHandler = () => {
    toggleOpenPlayer(false);
  };

  const hideLayerHandler = () => {
    if (formIsVisible) {
      toggleFormView(false);
      return;
    }
    if (playerIsOpen) {
      toggleOpenPlayer(false);
      return;
    }
  };

  return (
    <div
      className={`layer ${formIsVisible || playerIsOpen ? "active" : ""}`}
      onClick={hideLayerHandler}></div>
  );
};

const mapStateToProps = ({ nav, player }: StoreInitialState) => {
  const { formIsVisible } = nav;
  const { playerIsOpen } = player;
  return { formIsVisible, playerIsOpen };
};

const mapStateToDispatch = {
  toggleFormView,
  toggleOpenPlayer,
};

export default connect(mapStateToProps, mapStateToDispatch)(Layer);
