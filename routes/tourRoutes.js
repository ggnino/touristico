import { Router } from 'express';
import { getToursWithIn, getDistances, getAllTours, aliasTopTours, getTourStats, getMonthlyPlan, createTour, getTour, uploadTourImages, resizePhoto, updateTour, deleteTour } from '../controllers/tourController.js';
import { protect, restrictTo } from '../controllers/authController.js';
import reviewRouter from '../routes/reviewRoutes.js';
const tourRouter = Router();

// route middleware for tour reviews
tourRouter.use('/id/:id/reviews', reviewRouter);
// route for tours with in a radius
tourRouter
	.route('/tours-within/:distance/center/:latlng/unit/:unit')
	.get(getToursWithIn);
// route for distances from tours
tourRouter.route('/distances/:latlng/unit/:unit').get(getDistances);

tourRouter.route('/').get(getAllTours); // get all tours

// Aliasing
// route for the best 5 cheapest tours
tourRouter
	.route('/top-5-cheap')
	.get(aliasTopTours, getAllTours);
// route for tour statistics
tourRouter.route('/tour-stats').get(getTourStats);
// limited routes to the following user roles
tourRouter.use(
	protect,
	restrictTo('admin', 'lead-guide')
);
// planner route
tourRouter.route('/monthly-plan/:year').get(getMonthlyPlan);
// general crud tour routes
tourRouter.route('/').post(createTour); // create a tour

tourRouter
	.route('/id/:id') // route with tour ID
	.get(getTour) // get a tour by ID
	.patch(
		uploadTourImages,
		resizePhoto,
		updateTour
	) // update a tour by ID
	.delete(deleteTour); // delete a tour by ID

export default tourRouter;
