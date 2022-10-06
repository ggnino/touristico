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
} = require('../utils/handlerFunctions');

// const multerStorage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, `${__dirname}/../client/public/imgs/users`);
// 	},
// 	filename: (req, file, cb) => {
// 		const ext = file.mimetype.split('/')[1];

// 		cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
// 	},
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else cb(new AppError('File must be a image. Reupload please.', 400), false);
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserPhoto = upload.single('photo');

exports.resizePhoto = resize;

// set user ID middleware
exports.getMe = (req, res, next) => {
	console.log(777, req.user);
	req.params.id = req.user._id;
	// next middleware in the stack
	next();
};

exports.getGuides = catchAsync(async (req, res) => {
	const leadGuides = await User.find({ role: 'lead-guide' });
	const guides = await User.find({ role: 'guide' });

	const tourGuides = [...leadGuides, ...guides];

	res.status(200).json({
		status: 'success',
		result: tourGuides.length,
		tourGuides,
	});
});
// exports.getUserImage = (req, res) => {
// 	console.log(req.params.image);
// 	console.log(__dirname);

// 	// doc.photo = file;

// 	res.status(200).sendFile(
// 		path.resolve(`${__dirname}/../upload/users/${req.params.image}`),

// 		(err) => {
// 			if (err) {
// 				console.log(111111111, err);
// 			} else console.log('SENT!');
// 		}
// 	);
// };
// route handler for updating user info
exports.updateMe = catchAsync(async (req, res) => {
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
