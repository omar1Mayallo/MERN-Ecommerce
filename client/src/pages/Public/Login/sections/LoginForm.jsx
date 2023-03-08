import React from "react";
import {useFormik} from "formik";
import {Button, Spinner} from "reactstrap";
import FormInput from "../../../../common/components/Shared/FormInput";
import {LoginValidationSchema} from "../../../../common/validation/auth/loginValidation";
import {Link} from "react-router-dom";
import FormContainer from "../../../../common/components/Shared/FormContainer";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {login} from "../../../../features/user/userServices";

const LoginForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {loggedStatus} = useSelector((state) => state.user);

  // HANDLE_SUBMIT
  const handleSubmitForm = async (values, actions) => {
    dispatch(login(values));
  };
  // FORMIK
  const {handleBlur, handleChange, handleSubmit, values, errors, touched} =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginValidationSchema,
      onSubmit: handleSubmitForm,
    });
  // REDIRECTING
  let path = "/";
  if (location.state) {
    path = location.state.path;
  }

  useEffect(() => {
    if (loggedStatus.token) {
      localStorage.setItem("token", loggedStatus.token);
      localStorage.setItem("isLoggedIn", true);

      setTimeout(() => {
        window.location.href = path;
      }, 500);
    }
  }, [loggedStatus, path]);

  return (
    <FormContainer head={"Login"} handleSubmit={handleSubmit}>
      <FormInput
        errCondition={errors.email && touched.email}
        errMessage={errors.email}
        handleBlur={handleBlur}
        handleChange={handleChange}
        value={values.email}
        type="email"
        placeholder="Email"
        name="email"
      />
      <FormInput
        errCondition={errors.password && touched.password}
        errMessage={errors.password}
        handleBlur={handleBlur}
        handleChange={handleChange}
        value={values.password}
        name="password"
        type="password"
        placeholder="Password"
      />
      {loggedStatus?.loading ? (
        <Button color="primary" size="sm" block disabled>
          <Spinner size={"sm"} />
        </Button>
      ) : (
        <Button color="primary" size="sm" block type="submit">
          Login
        </Button>
      )}

      <p className="text-center mt-4" style={{fontSize: "14px"}}>
        Don't Have Account? <Link to={"/register"}>Register</Link>
      </p>
    </FormContainer>
  );
};

export default LoginForm;
