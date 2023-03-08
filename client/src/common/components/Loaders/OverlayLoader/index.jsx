import React from "react";
import {FadeLoader} from "react-spinners";
import {OverlayLoaderStyled} from "./styles";
const OverlayLoader = () => {
  return (
    <OverlayLoaderStyled>
      <FadeLoader color="#eeeeee" />
    </OverlayLoaderStyled>
  );
};

export default OverlayLoader;
