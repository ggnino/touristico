import Review from '../models/reviewModel.js';

import { deleteOne, updateOne, createOne, getOne, getAll } from '../utils/handlerFunctions.js';

// filter middleware
export function filter(req, res, next) {
	// filter obj
	req.body.filter = {};
	// assign tour id from params
	if (req.params.id) req.body.filter.tour = req.params.id;
	// next middleware in the stack
	next();
}
// set tour ID middleware
export function setTourId(req, res, next) {
	// if null or undefined assign tour id from params
	req.body.tour ??= req.params.id;
	// assign user from logged in credentials
	req.body.user = req.user._id;
	// next middleware in the stack
	next();
}
export const getAllReviews = getAll(Review);
export const createReview = createOne(Review);
export const getReview = getOne(Review);
export const updateReview = updateOne(Review);
export const deleteReview = deleteOne(Review);
