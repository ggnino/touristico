const AppError = require('./appError');
const APIFeatures = require('./apiFeatures');
const catchAsync = require('./catchAsync');
const sharp = require('sharp');
const fs = require('fs');
const con = require('../controllers/authController');
// handler for deleting one document
exports.deleteOne = (Model) =>
	catchAsync(async (req, res) => {
		// document found by params.id
		let doc = await Model.findById(req.params.id);
		// check if its the review model
		if (Model.modelName === 'Review') {
			// only admin or the user owner of the review can delete
			if (doc.user.id === req.user.id || req.user.role === 'admin') {
				// delete doc
				doc = await Model.findByIdAndDelete(req.params.id);
				// throw error if some other user tries to delete
			} else throw new AppError('Only user owned reviews are deletable', 403);
			// else delete document
		} else doc = await Model.findByIdAndDelete(req.params.id);
		// throw err that catchAsync will catch and pass to the global err handler
		if (!doc) throw new AppError(`Can not find document with that id.`, 404);
		// send response
		res.status(204).json({
			status: 'success',
		});
	});
// handler for updating one document
exports.updateOne = (Model) =>
	catchAsync(async (req, res) => {
		// document found by params.id
		let doc = await Model.findById(req.params.id);
		// check if its the review model
		if (Model.modelName === 'Review') {
			// only admin or the user owner of the review can update
			if (doc.user.id === req.user.id || req.user.role === 'admin') {
				// permission granted, edit document
				doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
					new: true,
					runValidators: true,
				});
				// throw error if some other user tries to edit
			} else throw new AppError('Only user owned reviews are editable', 403);
			// else edit document
		} else
			doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});

		// throw err that catchAsync will catch and pass to the global err handler
		if (!doc) throw new AppError(`Can not find document with that id.`, 404);
		// send response
		res.status(200).json({
			status: 'success',
			message: `${Model.modelName} with id ${req.params.id} has been updated successfully.`,
			[`updated${Model.modelName}`]: doc,
		});
	});
// handler for creating one document
exports.createOne = (Model) =>
	catchAsync(async (req, res) => {
		// create a tour document
		const doc = await Model.create(req.body);

		// send response
		res.status(201).json({
			status: 'success',
			[`new${Model.modelName}`]: doc,
		});
	});
// handler for getting one document
exports.getOne = (Model) =>
	catchAsync(async (req, res, next) => {
		// document query found by params.id
		let docQuery = Model.findById(req.params.id);
		// Only when its the Tour model, populate the reviews field
		if (Model.modelName === 'Tour') docQuery.populate('reviews');

		// execute query
		console.log('here!!!');
		const doc = await docQuery;

		// throw err that catchAsync will catch and pass to the global err handler
		if (!doc) throw new AppError(`Can not find document with that id.`, 404);

		if (Model.modelName === 'User') return con.sendToken1(doc, 200, res);
		// send response
		res.status(200).json({
			status: 'success',
			[`${Model.modelName}`]: doc,
		});
	});
// handler for getting all documents
exports.getAll = (Model) =>
	catchAsync(async (req, res) => {
		// add all api features to the query
		const features = new APIFeatures(Model.find(req.body.filter), req.query)
			.filter()
			.sort()
			.limitFields()
			.pagination();

		// execute query
		const docs = await features.query;

		// send response
		res.status(200).json({
			status: 'success',
			results: docs.length,
			[`${Model.modelName}s`]: docs,
		});
	});
// handler for resizing images
exports.resize = catchAsync(async (req, res, next) => {
	// resize a single image
	if (req.file) {
		// user image name
		req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
		// resize user image
		await sharp(req.file.buffer)
			.resize(128, 128)
			.toFormat('jpeg')
			.jpeg({ quality: 95 })
			.toFile(`${__dirname}/../client/public/imgs/users/${req.file.filename}`);
		// Add filename to req.body
		req.body.photo = req.file.filename;
	}
	// resize multiple images
	else if (req.files) {
		// Tour image Cover name
		req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
		// resize image cover
		await sharp(req.files.imageCover[0].buffer)
			.resize(2000, 1333)
			.toFormat('jpeg')
			.jpeg({ quality: 95 })
			.toFile(
				`${__dirname}/../client/public/imgs/tours/${req.body.imageCover}`
			);
		// intialize images array
		req.body.images = [];

		// Iterate through all tour images
		req.files.images.forEach(async (file, index) => {
			// Tour image name
			const fileName = `tour-${req.params.id}-${Date.now()}-${index + 1}.jpeg`;
			// Resize tour image
			await sharp(file.buffer)
				.resize(2000, 1333)
				.toFormat('jpeg')
				.jpeg({ quality: 90 })
				.toFile(`${__dirname}/../client/public/imgs/tours/${fileName}`);
			// Add tour image to array
			req.body.images.push(fileName);
		});
	}

	next();
});
