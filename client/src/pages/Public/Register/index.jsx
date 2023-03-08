import React from "react";
import {Container} from "reactstrap";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import RegisterForm from "./sections/RegisterForm";

const Register = () => {
  return (
    <>
      <PageHelmet title={"Register"} />
      <Container className="py-4">
        <RegisterForm />
      </Container>
    </>
  );
};

export default Register;
