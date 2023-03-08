import * as yup from "yup";

export const RegisterValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "minimum 3 length")
    .max(30, "maximum 30 length")
    .required("required"),
  email: yup.string().email("must be a valid email").required("required"),
  password: yup
    .string()
    .min(6, "must be minimum 6 length")
    .max(25, "must be maximum 25 length")
    .required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't matches")
    .required("required"),
});
