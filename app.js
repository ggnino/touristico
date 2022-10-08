const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const hpp = require('hpp');
const xss = require('xss-clean');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const globalErrHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const AppError = require('./utils/appError');
const app = express();

// Limit the number of requests from the same IP
const limiter = rateLimit({
	windowMs: 60 * 60 * 1000,
	max: 100,
	message: 'Too many login attempts from this IP, try again in a hour!',
});

////////////////////Global middlware\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use(cors({ origin: true }));

// Set security http headers
// app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Set req limiter
app.use('/api', limiter);
// Set static folder
// app.use(express.static(`${__dirname}/client/public`));
// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
	hpp({
		whitelist: [
			'ratingsAverage',
			'duration',
			'ratingsQuantity',
			'maxGroupSize',
			'difficulty',
			'price',
		],
	})
);

// Routes
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.use('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
app.use('*', (req, res, next) => {
	next(new AppError(`Can not find ${req.originalUrl} on this server.`, 404));
});
app.use(globalErrHandler);

module.exports = app;
