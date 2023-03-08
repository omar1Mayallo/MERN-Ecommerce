import User from "../model/userModel.js";
import APIError from "../utils/apiError.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import {verifyToken} from "../utils/tokenHandler.utils.js";

// @desc    isAuthenticated Middleware
export const isAuth = asyncHandler(async (req, res, next) => {
  // 1) Check if token is exist from req.headers.authorization(Bearer token)
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new APIError("Unauthorized , Please login to get access", 401));
  }

  // 2) Verify token
  const decoded = verifyToken(token);
  // console.log(decoded);

  // 3) Check if user is still exist (what if the user was deleted ? we check to see if the user is still exist or deleted)
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new APIError(
        "The user that belong to this token does no longer exist",
        401
      )
    );
  }

  // 4) Check if password changed after token created ( mean passwordChangedAt > token.iat )
  if (currentUser.isPasswordChangedAfterJwtIat(decoded.iat)) {
    return next(
      new APIError("User recently changed password, please log in again", 401)
    );
  }

  // 5) Reserve user to req object
  req.user = currentUser;

  next();
});

// @desc    allowedTo Middleware
export const allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new APIError(
          `You as ${req.user.role} do not have permission to perform this action`,
          403
        )
      );
    }
    next();
  };
};
