import jwt from "jsonwebtoken";

//_SIGN_TOKEN_//
export const signToken = (payload) => {
  return jwt.sign({userId: payload}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

//_VERIFY_TOKEN_//
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

//_GENERATE_AND_SEND_TOKEN_TO_RESPONSE_//
export const generateSendToken = (res, user, statusCode) => {
  const token = signToken(user._id);

  //_[SECURITY]-{CROSS_SITE_SCRIPTING(XSS)}_STORE_JWT_TO_COOKIES_//
  // @descOfAttack Attacker try to inject scripts to run a malicious code
  // @problem If we store jwt to local storage and If attacker inject code to read the local storage
  // @protection Jwt stored only in http-only cookies, so the browser receive and send cookie but cannot access or modified it, so we prevent attacker to steal jwt
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("token", token, cookieOptions);

  // Delete password field from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
