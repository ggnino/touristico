const User = require('../models/userModel');
const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');

// function for signing web tokens
function signToken(id) {
	// pass in the user id as the payload
	// pass the 'secret' and expiration info from .env
	// return the signed web token
	return promisify(jwt.sign)({ id }, process.env.JWT_SECRET, {
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
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // 90ds in ms
		),
		httpOnly: true,
	};
	// throw error
	if (!token) throw token;
	// activate secure connection
	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
	// set cookie with web token*******
	res.cookie('jwt', token, cookieOptions);

	// hide password in the output
	user.password = undefined;
	// send response with token
	res.status(statusCode).json({
		status: 'success',
		token,
		user,
	});
}
// function for sending response with web token
exports.sendToken1 = sendToken;
// route handler for /signup
exports.signup = catchAsync(async (req, res, next) => {
	// create new user
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
		role: req.body.role,
	});

	const url = `${req.protocol}://localhost:3000/login`; // req.get('host')

	await new Email(newUser, url).sendWelcome();

	// send response
	sendToken(newUser, 201, res);
});
// route handler for /login
exports.login = catchAsync(async (req, res, next) => {
	console.log('wow', req.body);
	// Destruct user email and password from req.body
	const { email, password } = req.body;

	// Throw error if email or password fields are not filled
	if (!email || !password) {
		throw new AppError('Please provide email and/or password.', 400);
	}
	// find user by email provided, make sure password & active fields are selected
	const user = await User.findOne({ email }).select('+password +active');

	// throw error if incorrect user email or password
	if (!user || !(await user.correctPassword(password))) {
		throw new AppError('Incorrect email and/or password.', 401);
	}
	// throw error if account is not activated
	if (!user.active) {
		throw new AppError(
			'Account is deactivated, please contact admin for account activation.',
			401
		);
	}
	console.log('aqui');

	// send response
	sendToken(user, 200, res);
});
// route middleware for protecting routes
exports.protect = catchAsync(async (req, res, next) => {
	if (req.cookies.jwt) {
		// token = req.cookies.jwt;
		const decodedPayLoad = await promisify(jwt.verify)(
			req.cookies.jwt,
			process.env.JWT_SECRET
		);

		const currentUser = await User.findById(decodedPayLoad.id);
		// throw error for invalid token
		if (!currentUser)
			throw new AppError('The user does not exist, token is invalid.', 401);
		// throw error if user changed password, since the web token been sent
		if (currentUser.changedPasswordAfter(decodedPayLoad.iat))
			throw new AppError(
				'User changed password, recently. Please log in again.',
				401
			); // Access granted
		req.user = currentUser;
		// next middleware in the stack

		next();
	} else throw new AppError('Access denied! Not logged in.', 401);
	// // throw error if no token
	// if (!token) {
	//
	// }
	// decode the payload by verifying web token

	// find user by the id in the decoded payload
});
// route middleware for user permissions
exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		// throw error if user role does not have permission
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError('You do not have permission to perform this action.', 403)
			);
		}
		// next middleware in the stack
		next();
	};
};
// route handler for /forgotPassword
exports.forgotPassword = catchAsync(async (req, res, next) => {
	// find user by email
	const user = await User.findOne({ email: req.body.email });
	// throw error when no user exists from the provided email
	if (!user) {
		throw new AppError('No user with that email exists.', 404);
	}
	// Generate random reset token
	const resetToken = user.passwordReset();
	// save document
	await user.save({ validateModifiedOnly: true });
	// user password url for reset password email
	const resetURL = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/users/resetPassword/${resetToken}`;

	const sent = await new Email(user, resetURL).sendResetToken();

	if (!sent) {
		// delete reset token info from user
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		// save user
		await user.save({ validateModifiedOnly: true });
		// throw email error
		throw new AppError('Error sending email!', 500);
	}
	// send response
	sendToken(user, 200, res);
});
// route handler for /resetPassword
exports.resetPassword = catchAsync(async (req, res, next) => {
	// hash user reset token from params
	const hashedToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');
	// find user by hashed token
	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	// throw error for invalid web token
	if (!user) {
		throw new AppError('Token is invalid or has expired.', 400);
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
// route handler for /updatePassword
exports.updatePassword = catchAsync(async (req, res, next) => {
	// Get user from collection and make sure password field is selected
	const user = await User.findById(req.user.id).select('+password');
	// throw error if current password does not match saved password
	if (!(await user.correctPassword(req.body.passwordCurrent))) {
		throw new AppError('Current password is wrong.', 401);
	}

	// Update user password
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();
	// send response
	sendToken(user, 200, res);
});
