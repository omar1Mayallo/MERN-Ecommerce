import React from "react";
import {FormInputStyled} from "./styles";

const FormInput = ({
  errMessage,
  errCondition,
  handleChange,
  handleBlur,
  value,
  ...restProps
}) => {
  return (
    <FormInputStyled>
      <input
        className={errCondition ? "err-input" : ""}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        {...restProps}
      />
      {errCondition && <p className="err-msg">{errMessage}</p>}
    </FormInputStyled>
  );
};

export default FormInput;
