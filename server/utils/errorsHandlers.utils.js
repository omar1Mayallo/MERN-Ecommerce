import APIError from "./apiError.utils.js";

// @type CAST_ERROR
// @desc handle invalid mongoDB id error
export const handleCastError = (err) => {
  return new APIError(`Invalid ${err.path}: ${err.value}.`, 400);
};

// @type DUPLICATION_ERROR
// @desc handle duplication error from duplicate a unique field
export const handleDuplicationError = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  return new APIError(
    `Duplicate field value: ${value}. Please use another value!`,
    400
  );
};

// @type VALIDATION_ERROR
// @desc handle validation error from mongoose schema validation
export const handleValidationError = (err) => {
  /* 
  - example on Object.values(obj) : 
  const object1 = {
  a: 'something',
  b: 42,
  c: false
  };
  console.log(Object.values(object1));
  // Expected output: Array ["something", 42, false]
  */
  const errors = Object.values(err.errors).map((el) => el.message);
  return new APIError(`Invalid input data. ${errors.join(" , ")}`, 400);
};

// @type INVALID_TOKEN_ERROR
export const handleJwtInvalidError = () =>
  new APIError("Invalid token, please login again", 401);

// @type EXPIRED_TOKEN_ERROR
export const handleJwtExpiredError = () =>
  new APIError("Expired token, please login again", 401);
