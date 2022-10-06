const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const router = express.Router({
	mergeParams: true,
});
// general CRUD review routes
router.route('/').get(reviewController.filter, reviewController.getAllReviews);
// protect routes, must be logged in to access them
router.use(authController.protect);
// general CRUD review routes
router
	.route('/')
	.get(reviewController.filter, reviewController.getAllReviews) // filter middleware to get all reviews
	.post(
		authController.restrictTo('user'), // restrict to user role only
		reviewController.setTourId, // set tour ID middleware
		reviewController.createReview // create a review
	);
// restrict following routes to admin and user roles only
router.use(authController.restrictTo('admin', 'user'));
router
	.route('/id/:id') // review id route
	.get(reviewController.getReview) // get review by ID
	.patch(reviewController.updateReview) // update review by ID
	.delete(reviewController.deleteReview); // delete review by ID

module.exports = router;
