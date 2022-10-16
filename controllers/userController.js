const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
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
// middleware for uploading a single image
exports.uploadUserPhoto = upload.single('photo');
// middleware for resizing image
exports.resizePhoto = resize;
// middleware for setting user id
exports.getMe = (req, res, next) => {
	// set user ID middleware
	req.params.id = req.user._id;
	// next middleware in the stack
	next();
};
// route handler for getting all tour guides
exports.getGuides = catchAsync(async (req, res) => {
	// find users by their roles lead-guides
	const leadGuides = await User.find({ role: 'lead-guide' });
	// find users by their roles guides
	const guides = await User.find({ role: 'guide' });
	// arr holding all guides
	const tourGuides = [...leadGuides, ...guides];
	// send response
	res.status(200).json({
		status: 'success',
		result: tourGuides.length,
		tourGuides,
	});
});

// route handler for updating user info
exports.updateMe = catchAsync(async (req, res) => {
	console.log('not here');
	// throw error if user tried to update credentials in this route
	if (req.body.password || req.body.passwordConfirm) {
		throw new AppError(
			'This route is not where you update your password. Please use /updatePassword',
			403
		);
	}
	// throw error if user tried to changed assigned role
	if (req.body.role) {
		throw new AppError(
			'You do not have permission to change your user role.',
			403
		);
	}

	// find user by ID and update
	const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
		new: true,
		runValidators: true,
	});
	// throw error if user not found
	if (!updatedUser) throw new AppError('Cant find that user.', 404);
	//photo name
	console.log(updatedUser);
	if (req.body.photo) {
		res.status(200).json({
			status: 'success',
			message: 'User has been updated.',
			photo: req.body.photo,
		});
	}

	// send response
	else
		res.status(200).json({
			status: 'success',
			message: 'User has been updated.',
		});
});
// route handler for deactivating user account
exports.deactivateAccount = catchAsync(async (req, res) => {
	await User.findByIdAndUpdate(req.user.id, { active: false });

	res.status(200).json({
		status: 'success',
		message: 'Account has been deactivated. Will be deleted in 30 days.',
	});
});
// CRUD route handlers
exports.getAllUsers = getAll(User);
exports.getUser = getOne(User);
exports.createUser = createOne(User);
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);
// route handler for deleting all inactive accounts
exports.deleteUsers = catchAsync(async (req, res) => {
	await User.find({ active: false }).deleteMany();

	res.status(204).json({
		status: 'success',
	});
});
