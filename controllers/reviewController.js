const Review = require('../models/reviewModel');

const {
	deleteOne,
	updateOne,
	createOne,
	getOne,
	getAll,
} = require('../utils/handlerFunctions');

// filter middleware
exports.filter = (req, res, next) => {
	// filter obj
	req.body.filter = {};
	// assign tour id from params
	if (req.params.id) req.body.filter.tour = req.params.id;
	// next middleware in the stack
	next();
};
// set tour ID middleware
exports.setTourId = (req, res, next) => {
	// if null or undefined assign tour id from params
	req.body.tour ??= req.params.id;
	// assign user from logged in credentials
	req.body.user = req.user._id;
	// next middleware in the stack
	next();
};
// CRUD route handlers
exports.getAllReviews = getAll(Review);
exports.createReview = createOne(Review);
exports.getReview = getOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);
