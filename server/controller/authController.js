import User from "../model/userModel.js";
import APIError from "../utils/apiError.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import {generateSendToken} from "../utils/tokenHandler.utils.js";

// @desc    User Register
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const {username, email, password, confirmPassword} = req.body;
  //_CHECK_//
  // 1) If all data entered
  if (!username || !email || !password || !confirmPassword) {
    return next(new APIError("Please fill all fields", 400));
  }
  // 2) If email is already exist
  const userExist = await User.findOne({email});
  if (userExist) {
    return next(
      new APIError("Email is already exist , please enter new email", 400)
    );
  }

  //_CREATE_NEW_USER_//
  const newUser = await User.create({
    username,
    email,
    password,
    confirmPassword,
  });
  //_GENERATE_AND_SEND_TOKEN_TO_RESPONSE_//
  generateSendToken(res, newUser, 201);
});

// @desc    User Login
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const {email, password} = req.body;
  //_CHECK_//
  // 1) If all data entered
  if (!email || !password) {
    return next(new APIError("Please fill all fields", 400));
  }
  // 2) If user exists and password is true
  const user = await User.findOne({email}).select("+password");
  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(new APIError("Invalid email or password", 400));
  }

  //_GENERATE_AND_SEND_TOKEN_TO_RESPONSE_//
  generateSendToken(res, user, 200);
});

// @desc    User Logout
// @route   POST /api/auth/logout
// @access  Protected
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
