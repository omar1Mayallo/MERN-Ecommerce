import React from "react";
import {PuffLoader} from "react-spinners";
import {FullBackStyled} from "./styles";

const FullBackLoader = () => {
  return (
    <FullBackStyled>
      <PuffLoader color="#000000" />
    </FullBackStyled>
  );
};

export default FullBackLoader;
