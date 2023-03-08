import * as yup from "yup";

export const LoginValidationSchema = yup.object().shape({
  email: yup.string().email("must be a valid email").required("required"),
  password: yup
    .string()
    .min(6, "must be minimum 6 length")
    .max(25, "must be maximum 25 length")
    .required("required"),
});
