import React from "react";
import {CenterHeadStyled} from "./styles";

const CenterHead = ({head}) => {
  return (
    <div className="text-center">
      <CenterHeadStyled>
        <span>{head}</span>
      </CenterHeadStyled>
    </div>
  );
};

export default CenterHead;
