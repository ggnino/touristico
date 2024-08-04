import User from "../models/userModel.js";
import { promisify } from "util";
import { createHash } from "crypto";
import pkg from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import Email from "../utils/email.js";

const { sign, verify } = pkg;

// function for signing web tokens
function signToken(id) {
  // pass in the user id as the payload
  // pass the 'secret' and expiration info from .env
  // return the signed web token
  return promisify(sign)({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
// function for sending response with web token
async function sendToken(user, statusCode, res) {
  // JSON web token
  const token = await signToken(user._id);

  // cookie options
  let cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 1000 // cookie expiration ms
    ),
    httpOnly: true,
  };
  // throw error
  if (!token) throw token;
  // activate secure connection
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  // set cookie with web token*******
  res.cookie("jwt", token, cookieOptions);

  // hide password in the output
  user.password = undefined;
  // send response with token
  res.status(statusCode).json({
    status: "success",
    user,
    token
  });
}
export const sendToken1 = sendToken;
export const signup = catchAsync(async (req, res, next) => {
  // create new user
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  const url = `${req.protocol}://${req.get('host')}/login`; // req.get('host')no

  await new Email(newUser, url).sendWelcome();

  // send response
  sendToken(newUser, 201, res);
});
export const login = catchAsync(async (req, res, next) => {
  // Destruct user email and password from req.body
  const { email, password } = req.body;

  // Throw error if email or password fields are not filled
  if (!email || !password) {
    throw new AppError("Please provide email and/or password.", 400);
  }
  // find user by email provided, make sure password & active fields are selected
  const user = await User.findOne({ email }).select("+password +active");

  // throw error if incorrect user email or password
  if (!user || !(await user.correctPassword(password))) {
    throw new AppError("Incorrect email and/or password.", 401);
  }
  // throw error if account is not activated
  if (!user.active) {
    throw new AppError(
      "Account is deactivated, please contact admin for account activation.",
      401
    );
  }

  // send response
  sendToken(user, 200, res);
});
export const protect = catchAsync(async (req, res, next) => {

  // check for jwt
  if (req.cookies.jwt) {

    // decode paylod from jwt
    const decodedPayLoad = await promisify(verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    ).catch(err => { throw new AppError("Log in session expired. Please log in again.", 401) });

    // find user by id
    const currentUser = await User.findById(decodedPayLoad.id);
    // throw error for invalid token
    if (!currentUser)
      throw new AppError("The user does not exist, token is invalid.", 401);
    // throw error if user changed password, since the web token been sent
    if (currentUser.changedPasswordAfter(decodedPayLoad.iat))
      throw new AppError(
        "User changed password, recently. Please log in again.",
        401
      );
    // Access granted
    req.user = currentUser;
    // next middleware in the stack
    next();
  } else throw new AppError("Access denied! Not logged in.", 401);
});
// route middleware for user permissions
export function restrictTo(...roles) {
  return (req, res, next) => {
    // throw error if user role does not have permission
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action.", 403)
      );
    }
    // next middleware in the stack
    next();
  };
}
export const forgotPassword = catchAsync(async (req, res, next) => {
  // find user by email
  const user = await User.findOne({ email: req.body.email });
  // throw error when no user exists from the provided email
  if (!user) {
    throw new AppError("No user with that email exists.", 404);
  }
  // Generate random reset token
  const resetToken = user.passwordReset();
  // save document
  await user.save({ validateModifiedOnly: true });
  // user password url for reset password email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const sent = await new Email(user, resetURL).sendResetToken();

  if (!sent) {
    // delete reset token info from user
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    // save user
    await user.save({ validateModifiedOnly: true });
    // throw email error
    throw new AppError("Error sending email!", 500);
  }
  // send response
  sendToken(user, 200, res);
});
export const resetPassword = catchAsync(async (req, res, next) => {
  // hash user reset token from params
  const hashedToken = createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  // find user by hashed token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // throw error for invalid web token
  if (!user) {
    throw new AppError("Token is invalid or has expired.", 400);
  }
  // change user password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  // delete reset token info
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  // save document
  await user.save();
  // send response
  sendToken(user, 200, res);
});
export const updatePassword = catchAsync(async (req, res, next) => {
  // Get user from collection and make sure password field is selected
  const user = await User.findById(req.user.id).select("+password");
  // throw error if current password does not match saved password
  if (!(await user.correctPassword(req.body.passwordCurrent))) {
    throw new AppError("Current password is wrong.", 401);
  }

  // Update user password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // send response
  sendToken(user, 200, res);
});
