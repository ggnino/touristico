import { Router } from 'express';
const router = Router();
import { getToursWithIn, getDistances, getAllTours, aliasTopTours, getTourStats, getMonthlyPlan, createTour, getTour, uploadTourImages, resizePhoto, updateTour, deleteTour } from '../controllers/tourController.js';
import { protect, restrictTo } from '../controllers/authController.js';
import reviewRouter from '../routes/reviewRoutes.js';

// route middleware for tour reviews
router.use('/id/:id/reviews', reviewRouter);
// route for tours with in a radius
router
	.route('/tours-within/:distance/center/:latlng/unit/:unit')
	.get(getToursWithIn);
// route for distances from tours
router.route('/distances/:latlng/unit/:unit').get(getDistances);

router.route('/').get(getAllTours); // get all tours

// Aliasing
// route for the best 5 cheapest tours
router
	.route('/top-5-cheap')
	.get(aliasTopTours, getAllTours);
// route for tour statistics
router.route('/tour-stats').get(getTourStats);
// limited routes to the following user roles
router.use(
	protect,
	restrictTo('admin', 'lead-guide')
);
// planner route
router.route('/monthly-plan/:year').get(getMonthlyPlan);
// general crud tour routes
router.route('/').post(createTour); // create a tour

router
	.route('/id/:id') // route with tour ID
	.get(getTour) // get a tour by ID
	.patch(
		uploadTourImages,
		resizePhoto,
		updateTour
	) // update a tour by ID
	.delete(deleteTour); // delete a tour by ID

export default router;
