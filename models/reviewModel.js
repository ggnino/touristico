import { Schema, model } from 'mongoose';
import Tour from './tourModel.js';

const reviewSchema = new Schema({
	review: {
		type: String,
		required: [true, 'Review can not be empty.'],
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		default: 3,
	},
	tour: {
		type: Schema.Types.ObjectId,
		ref: 'Tour',
		required: [true, 'Review must belong to a tour!'],
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});
// all reviews must be unique
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// pre-hook middlware
reviewSchema.pre(/^find/, function (next) {
	// populate the user field and only select name and photo fields
	this.populate({
		path: 'user',
		select: 'name photo',
	});
	// next middleware in the stack
	next();
});
// post hook middleware for average ratings
reviewSchema.post('save', function () {
	// document model use static methods to calculate review ratings
	this.constructor.calAvgRatings(this.tour);
});
// post hook middleware for updating or deleting document
reviewSchema.post(/^findOneAnd/, async function (doc) {
	// update the average ratings after updating or deletion
	await doc.constructor.calAvgRatings(doc.tour);
});
// static method for calculation of review ratings
reviewSchema.statics.calAvgRatings = async function (tourID) {
	// aggregation pipeline for avg ratings
	const reviewStats = await this.aggregate([
		{
			$match: { tour: tourID }, // all reviews from the same tour
		},
		{
			$group: {
				_id: '$tour', // group by tour id
				numRatings: { $sum: 1 }, // the number of ratings in the tour
				avgRating: { $avg: '$rating' }, // the average rating of the tour
			},
		},
	]);
	// uodate tour with new ratings info
	await Tour.findByIdAndUpdate(tourID, {
		ratingsQuantity: reviewStats[0].numRatings,
		ratingsAverage: reviewStats[0].avgRating,
	});
};

const Review = model('Review', reviewSchema);

export default Review;
