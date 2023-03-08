import {
  handleJwtInvalidError,
  handleJwtExpiredError,
  handleCastError,
  handleDuplicationError,
  handleValidationError,
} from "../utils/errorsHandlers.utils.js";

const sendErrorToDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

//In Production Mode show operational(predicted) errors only, programming and other bugs or errors ==> let user show generic message
const sendErrorToProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("🔴_ERROR_🔴", err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const GlobalErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  //________DEVELOPMENT_ERRORS________//
  if (process.env.NODE_ENV === "development") {
    sendErrorToDev(err, res);
    //________PRODUCTION_ERRORS________//
  } else if (process.env.NODE_ENV === "production") {
    // NOT good practice to override an argument (ex: err = handleCastError(err)) of function
    let error = {...err, name: err.name, message: err.message};

    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicationError(error);
    if (error.name === "ValidationError") error = handleValidationError(error);
    if (error.name === "JsonWebTokenError") error = handleJwtInvalidError();
    if (error.name === "TokenExpiredError") error = handleJwtExpiredError();

    sendErrorToProd(error, res);
  }
};

export default GlobalErrorMiddleware;
