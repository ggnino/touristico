import Tour from '../models/tourModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { deleteOne, updateOne, createOne, getOne, getAll, resize, upload } from '../utils/handlerFunctions.js';

const { aggregate, find } = Tour;

export const uploadTourImages = upload.fields([
	{ name: 'imageCover', maxCount: 1 },
	{ name: 'images', maxCount: 3 },
]);
export const resizePhoto = resize;

// middleware for the best 5 cheap tours route
export function aliasTopTours(req, res, next) {
	req.query.limit = '5'; // display only 5 results
	req.query.sort = '-ratingsAverage price'; // sort by the highest ratingsAverage and cheapest price
	req.query.fields = 'name price ratingsAverage difficulty duration'; // only display those fields in the document

	next(); // move to the next middleware in the stack
}

export const getAllTours = getAll(Tour);
export const getTour = getOne(Tour);
export const createTour = createOne(Tour);
export const updateTour = updateOne(Tour);
export const deleteTour = deleteOne(Tour);

export const getTourStats = catchAsync(async (req, res) => {
	// tour stats
	const stats = await aggregate([
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
export const getMonthlyPlan = catchAsync(async (req, res) => {
	// convert string into number
	const year = req.params.year * 1;
	// monthly plan
	const plan = await aggregate([
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
export const getToursWithIn = catchAsync(async (req, res) => {
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
	const tours = await find({
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
export const getDistances = catchAsync(async (req, res) => {
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
	const distances = await aggregate([
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
