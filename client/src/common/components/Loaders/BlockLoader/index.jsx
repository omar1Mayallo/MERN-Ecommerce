import React from "react";
import {Spinner} from "reactstrap";

const BlockLoader = ({minHeight}) => {
  return (
    <div
      className="w-100 h-100 d-flex align-items-center justify-content-center"
      style={{minHeight: `${minHeight || 160}px`}}
    >
      <Spinner />
    </div>
  );
};

export default BlockLoader;
