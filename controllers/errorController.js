const AppError = require('../utils/appError');
// Only display the necessary info to the client when running in production
function sendProdErr(err, res) {
	// Operational errors send message to client
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
		// Programming or other unknown error. no details for client for security reasons
	} else {
		console.error('Error 🔥', err);
		// send generic message
		res.status(500).json({
			status: 'error',
			message: 'Ooops! Something went wrong.',
		});
	}
}
// Send detailed information when running in development
function sendDevErr(err, res) {
	res.status(err.statusCode).json({
		status: err.status,
		err: err,
		message: err.message,
		stack: err.stack,
	});
}
// Handler for JWt error
function handleJWTErr() {
	// error
	return new AppError('Invalid token! Please log in again.', 401);
}
// Handler for JWt expired error
function handleJWTExpiredErr() {
	// error
	return new AppError('Login session expired. Please log in again.', 401);
}
// Handler for duplicate field
function handleDuplicateDB(err) {
	// error property
	const errProp = Object.keys(err.keyValue)[0];
	// error message
	const msg = `Duplicate field value: ${err.keyValue[errProp]}. Please use another ${errProp}.`;
	// error
	return new AppError(msg, 400);
}
// Handler for cast error
function handleCastErrorDB(err) {
	// error message
	const msg = `Invalid ${err.path}: ${err.value}`;
	// error
	return new AppError(msg, 400);
}

// Handler for validation error
function handleValidationDB(err) {
	// error message
	const errors = Object.values(err.errors).map((value) => value.message);
	// formated err msg
	const msg = `${errors.join('.')}`;
	// error
	return new AppError(msg, 400);
}
module.exports = (err, req, res, next) => {
	// error status code
	err.statusCode = err.statusCode || 500;
	// error status msg
	err.status = err.status || 'error';
	// Only running in production
	if (process.env.NODE_ENV === 'production') {
		// duplicate in the database error
		if (err.code === 11000) err = handleDuplicateDB(err);
		// casting error
		if (err.name === 'CastError') err = handleCastErrorDB(err);
		// validation error
		if (err.name === 'ValidationError') err = handleValidationDB(err);
		// JSON web token error
		if (err.name === 'JsonWebTokenError') err = handleJWTErr();
		// expired token error
		if (err.name === 'TokenExpiredError') err = handleJWTExpiredErr();
		// send production error
		sendProdErr(err, res);
	}
	// send development error
	else sendDevErr(err, res);
};
