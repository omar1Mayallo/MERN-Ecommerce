import React from "react";
import {FadeLoader} from "react-spinners";
import {OverlayLoaderStyled} from "./styles";
const OverlayLoader = ({active}) => {
  return (
    <OverlayLoaderStyled active={active}>
      <FadeLoader color="#f3f3f3" />
    </OverlayLoaderStyled>
  );
};

export default OverlayLoader;
