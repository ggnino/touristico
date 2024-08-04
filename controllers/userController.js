import User from '../models/userModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import { deleteOne, updateOne, createOne, getOne, getAll, resize, upload } from '../utils/handlerFunctions.js';


export const uploadUserPhoto = upload.single('photo');
export const resizePhoto = resize;
// middleware for setting user id
export function getMe(req, res, next) {
	// set user ID middleware
	req.params.id = req.user._id;

	// next middleware in the stack
	next();
}
export const getGuides = catchAsync(async (req, res) => {
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

export const updateMe = catchAsync(async (req, res) => {
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

	// send response
	res.status(200).json({
		status: 'success',
		message: 'User has been updated.',
		user: updatedUser
	});
});
export const deactivateAccount = catchAsync(async (req, res) => {
	await User.findByIdAndUpdate(req.user.id, { active: false });

	res.status(200).json({
		status: 'success',
		message: 'Account has been deactivated. Will be deleted in 30 days.',
	});
});
export const getAllUsers = getAll(User);
export const getUser = getOne(User);
export const createUser = createOne(User);
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
export const deleteUsers = catchAsync(async (req, res) => {
	await find({ active: false }).deleteMany();

	res.status(204).json({
		status: 'success',
	});
});
