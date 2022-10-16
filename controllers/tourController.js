const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const sharp = require('sharp');

const {
	deleteOne,
	updateOne,
	createOne,
	getOne,
	getAll,
	resize,
	upload,
} = require('../utils/handlerFunctions');

// middleware for uploading multiple tour images
exports.uploadTourImages = upload.fields([
	{ name: 'imageCover', maxCount: 1 },
	{ name: 'images', maxCount: 3 },
]);
// middleware for resizing images
exports.resizePhoto = resize;

// middleware for the best 5 cheap tours route
exports.aliasTopTours = (req, res, next) => {
	req.query.limit = '5'; // display only 5 results
	req.query.sort = '-ratingsAverage price'; // sort by the highest ratingsAverage and cheapest price
	req.query.fields = 'name price ratingsAverage difficulty duration'; // only display those fields in the document

	next(); // move to the next middleware in the stack
};

// CRUD route handlers
exports.getAllTours = getAll(Tour);
exports.getTour = getOne(Tour);
exports.createTour = createOne(Tour);
exports.updateTour = updateOne(Tour);
exports.deleteTour = deleteOne(Tour);

// route handler for getting tour statistics
exports.getTourStats = catchAsync(async (req, res) => {
	// tour stats
	const stats = await Tour.aggregate([
		{
			$match: {
				// match all tour docs by ratingAvg 4.5=<
				ratingsAverage: {
					$gte: 4.5,
				},
			},
		},
		{
			$group: {
				// group by difficulty
				_id: { $toUpper: '$difficulty' }, // stats for each field
				numTours: { $sum: 1 }, // add one for each tour
				numRatings: { $sum: '$ratingsQuantity' }, // add all ratingsQuantity
				avgRatings: { $avg: '$ratingsAverage' }, // avg for all ratingsQuantity
				avgPrice: { $avg: '$price' }, // avg for tour prices
				minPrice: { $min: '$price' }, // min tour price
				maxPrice: { $max: '$price' }, // max tour price
			},
		},
		{
			$sort: {
				avgPrice: 1, // sort by avg price ascending order
			},
		},
	]);
	// send response
	res.status(200).json({
		status: 'success',
		results: stats.length,
		stats,
	});
});
// route handler for the monthly planner
exports.getMonthlyPlan = catchAsync(async (req, res) => {
	// convert string into number
	const year = req.params.year * 1;
	// monthly plan
	const plan = await Tour.aggregate([
		{
			$unwind: '$startDates', // unpacks the startDates arr
		},
		{
			$match: {
				// match all tours within the same year
				startDates: {
					$gte: new Date(`${year}-01-01`),
					$lte: new Date(`${year}-12-31`),
				},
			},
		},
		{
			$group: {
				_id: { $month: '$startDates' }, // group all documents by month
				numTours: { $sum: 1 }, // add all the tours for each month
				tours: { $push: '$name' }, // add the name of the tours in a arr
			},
		},
		{
			$addFields: {
				month: '$_id', // adds a month field
			},
		},
		{
			$project: {
				_id: 0, // does not display the _id field
			},
		},
		{
			$sort: {
				numTours: -1, // number of tours in descending order
			},
		},
	]);
	// send response
	res.status(200).json({
		status: 'success',
		plan,
	});
});
// route handler for getting tours with in a certain distance
exports.getToursWithIn = catchAsync(async (req, res) => {
	// destructoring params obj
	const { distance, latlng, unit } = req.params;

	const [lat, lng] = latlng.split(',');
	// radius must be in radians, divide distance by the earths radius in mi or km units
	const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
	// throw error  for invalid values for latitude or longitude
	if (isNaN(lng * 1) || isNaN(lng * 1)) {
		throw new AppError(
			'Invalid values for latitude/longitude numeric values only.',
			400
		);
	}
	// execute document query
	const tours = await Tour.find({
		// find tours by start location
		startLocation: {
			$geoWithin: {
				// with in a certain distance
				$centerSphere: [[lng, lat], radius], // the actual distance to search in using coordinates for start location and using the radians as the radius
			},
		},
	});
	// send response
	res.status(200).json({
		status: 'success',
		results: tours.length,
		tours,
	});
});
// route handler for getting the actual distance from a certain point
exports.getDistances = catchAsync(async (req, res) => {
	// destructoring params obj
	const { latlng, unit } = req.params;

	const [lat, lng] = latlng.split(',');
	// convert from meters to miles or kilometers
	let distanceMultiplier = unit === 'mi' ? 0.000621371 : 0.001;

	// throw error  for invalid values for latitude or longitude
	if (isNaN(lng * 1) || isNaN(lng * 1)) {
		throw new AppError(
			'Invalid values for latitude/longitude numeric values only.',
			400
		);
	}
	// distances stats
	const distances = await Tour.aggregate([
		{
			$geoNear: {
				// the point to start calculating the distance
				near: {
					type: 'Point',
					coordinates: [lng * 1, lat * 1],
				},
				// field name for the calculated distances
				distanceField: 'distance',
				distanceMultiplier, // multiplier to convert from meters
			},
		},
		{
			$project: {
				// only project selected fields only
				distance: 1,
				name: 1,
			},
		},
	]);
	// send response
	res.status(200).json({
		status: 'success',
		distances,
	});
});
