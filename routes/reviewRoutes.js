import { Router } from 'express';
import { filter, getAllReviews, setTourId, createReview, getReview, updateReview, deleteReview } from '../controllers/reviewController.js';
import { protect, restrictTo } from '../controllers/authController.js';
const reviewRouter = Router({
	mergeParams: true,
});
// general CRUD review routes
reviewRouter.route('/').get(filter, getAllReviews);
// protect routes, must be logged in to access them
reviewRouter.use(protect);
// general CRUD review routes
reviewRouter
	.route('/')
	.get(filter, getAllReviews) // filter middleware to get all reviews
	.post(
		restrictTo('user'), // restrict to user role only
		setTourId, // set tour ID middleware
		createReview // create a review
	);
// restrict following routes to admin and user roles only
reviewRouter.use(restrictTo('admin', 'user'));
reviewRouter
	.route('/id/:id') // review id route
	.get(getReview) // get review by ID
	.patch(updateReview) // update review by ID
	.delete(deleteReview); // delete review by ID

export default reviewRouter;
