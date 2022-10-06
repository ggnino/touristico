const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRoutes');

// route middleware for tour reviews
router.use('/id/:id/reviews', reviewRouter);
// route for tours with in a radius
router
	.route('/tours-within/:distance/center/:latlng/unit/:unit')
	.get(tourController.getToursWithIn);
// route for distances from tours
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router.route('/').get(tourController.getAllTours); // get all tours

// Aliasing
// route for the best 5 cheapest tours
router
	.route('/top-5-cheap')
	.get(tourController.aliasTopTours, tourController.getAllTours);
// route for tour statistics
router.route('/tour-stats').get(tourController.getTourStats);
// limited routes to the following user roles
router.use(
	authController.protect,
	authController.restrictTo('admin', 'lead-guide')
);
// planner route
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
// general crud tour routes
router.route('/').post(tourController.createTour); // create a tour

router
	.route('/id/:id') // route with tour ID
	.get(tourController.getTour) // get a tour by ID
	.patch(
		tourController.uploadTourImages,
		tourController.resizePhoto,
		tourController.updateTour
	) // update a tour by ID
	.delete(tourController.deleteTour); // delete a tour by ID

module.exports = router;
