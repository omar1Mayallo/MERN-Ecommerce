import React from "react";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import LoginForm from "./sections/LoginForm";
import {Container} from "reactstrap";
const Login = () => {
  return (
    <>
      <PageHelmet title={"Login"} />
      <Container className="py-4">
        <LoginForm />
      </Container>
    </>
  );
};

export default Login;
