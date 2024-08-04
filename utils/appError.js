class AppError extends Error {
	constructor(msg, statusCode) {
		super(msg);

		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor); // passed this.constructor so it does not pollute the stack
	}
}

export default AppError;
