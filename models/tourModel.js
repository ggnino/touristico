const mongoose = require('mongoose');
const slugify = require('slugify');
const strValidator = require('validator');
const User = require('./userModel');
const tourSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			unique: true,
			required: [true, 'The tour must have name'],
			trim: true,
			maxLength: [40, 'The tour name can not have more than 40 characters.'],
			minLength: [10, 'The tour name must have at least 10 characters.'],
			validate: {
				validator: function (val) {
					return strValidator.isAlpha(val, 'en-US', { ignore: ' ' });
				},
				message: 'The tour name must contain only letters.',
			},
		},
		slug: String,
		duration: {
			type: Number,
			required: [true, 'The tour must have a duration of time.'],
		},
		maxGroupSize: {
			type: Number,
			required: [true, 'The tour must have a group size maximum.'],
		},
		difficulty: {
			type: String,
			required: [true, 'The tour must have a difficulty property.'],
			enum: {
				values: ['easy', 'medium', 'difficult'],
				message: 'Accepted difficulty values are: easy, medium, or difficult.',
			},
		},
		ratingsAverage: {
			type: Number,
			default: 4,
			min: [1, 'Rating must be at 1.0.'],
			max: [5, 'Rating can not be more than 5.0.'],
			set: (val) => Math.round(val * 10) / 10,
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
			// Hiding certain doc properties from the output, ex: sensitive data only to be worked with internally
			//select: false
		},
		price: {
			type: Number,
			required: [true, 'The tour must have a price.'],
		},
		priceDiscount: {
			type: Number,
			validate: {
				validator: function (val) {
					console.log(this);
					return this.price > val;
				},
				message: 'The discount can not be greater than the price.',
			},
		},
		summary: {
			type: String,
			trim: true,
			required: [true, 'The tour must have a summary'],
		},
		description: {
			type: String,
			trim: true,
		},
		imageCover: {
			type: String,
			required: [true, 'The tour must have a cover.'],
		},
		images: [String],
		startDates: [Date],
		startLocation: {
			// GeoJSON for geospatial data latitude and longitude...arr stores longitude first then latitude which is the opposite way of using them.
			type: {
				type: String,
				default: 'Point',
				enum: ['Point'],
			},
			coordinates: [Number],
			address: String,
			description: String,
		},
		// embeded doc
		locations: [
			{
				type: {
					type: String,
					default: 'Point',
					enum: ['Point'],
				},
				coordinates: [Number],
				// address: String,
				description: String,
				day: Number,
			},
		],
		guides: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
		id: false, // removes the extra id prop from the virtual getter
	}
);
// Indexes for better read performance
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
// index all start locations on a 2dsphere for geospatial queries
tourSchema.index({ startLocation: '2dsphere' });

// Virtual props
tourSchema.virtual('durationWeeks').get(function () {
	// valid duration days return in weeks format
	if (this.duration) return this.duration / 7;
});
// reviews prop for tour
tourSchema.virtual('reviews', {
	ref: 'Review',
	foreignField: 'tour',
	localField: '_id',
});

// Document middleware
// pre save hook for slugifying tour name
tourSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	// next middleware in the stack
	next();
});
// not needed
// pre save hook for embedding guide docs
// tourSchema.pre('save', async function (next) {
// 	// find tour guides by id, and embed guides
// 	this.guides = await User.find({ _id: { $in: this.guides } });

// 	// next middleware in the stack
// 	next();
// });

// Query middleware
// pre find hook for embedding guide docs
tourSchema.pre(/^find/, function (next) {
	// populate doc
	this.populate({
		path: 'guides', // guides field
		select: '-__v -passwordChangedAt', // deselect both fields
	});
	// next middleware in the stack
	next();
});
tourSchema.post('save', function (doc, next) {
	// next middleware in the stack
	next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
