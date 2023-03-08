import React from "react";
import {Form} from "reactstrap";
import userImg from "../../../../assets/imgs/user.png";

const FormContainer = ({head, handleSubmit, children}) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
      className="bg-light mx-auto p-3 rounded"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        maxWidth: "370px",
      }}
    >
      <div className="d-flex flex-column align-items-center gap-2 mb-3">
        <img src={userImg} alt="form-img" width={70} height={70} />
        <h1 className="text-center" style={{fontSize: "30px", fontWeight: 800}}>
          {head}
        </h1>
      </div>

      {children}
    </Form>
  );
};

export default FormContainer;
