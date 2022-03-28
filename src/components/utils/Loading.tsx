import React from "react";
import { connect } from "react-redux";

//import images
import loadingImg from "assets/images/loading.gif";

//import types
import { LoadingProps } from "types/components/Loading";
import StoreInitialState from "types/redux";

const Loading: React.FC<LoadingProps> = (props) => {
  const { isLoading } = props;
  return (
    <div className={isLoading ? "loading visible" : "loading"}>
      <img src={loadingImg} alt="loading" />
    </div>
  );
};

const mapStateToProps = ({ music }: StoreInitialState) => {
  const { isLoading } = music;
  return { isLoading };
};

export default connect(mapStateToProps)(Loading);
