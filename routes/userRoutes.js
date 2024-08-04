import { Router } from 'express';
import { getGuides, getMe, getUser, uploadUserPhoto, resizePhoto, updateMe, deactivateAccount, getAllUsers, createUser, deleteUsers, updateUser, deleteUser } from '../controllers/userController.js';
import { login, signup, forgotPassword, resetPassword, protect, updatePassword, restrictTo } from '../controllers/authController.js';
const userRouter = Router();


userRouter.route('/guides').get(getGuides);

// login route
userRouter.route('/login').post(login);
// sign up route for new users
userRouter.route('/signup').post(signup);
// forgot password route
userRouter.route('/forgotPassword').post(forgotPassword);
// reset password route
userRouter.route('/resetPassword/:token').patch(resetPassword);
// protect middleware for all routes below, must be logged in order to access routes
userRouter.use(protect);
// update password route
userRouter.route('/updatePassword').patch(updatePassword);
userRouter.route('/me').get(getMe, getUser);

// update user data route
userRouter
	.route('/updateMe')
	.patch(
		uploadUserPhoto,
		resizePhoto,
		updateMe
	);
// deactivate user account
userRouter.route('/deactivateMe').patch(deactivateAccount);
// restrict permissions of the following routes to admin role
userRouter.use(restrictTo('admin'));

userRouter
	.route('/') // users route
	.get(getAllUsers) // get all users
	.post(createUser); // create a user
// admin route to delete all deactivated account
userRouter.route('/id/deactivated/removeUsers').delete(deleteUsers);

userRouter
	.route('/id/:id') // user ID route
	.get(getUser) // get user by ID
	.patch(updateUser) // update user by ID
	.delete(deleteUser); // delete user by ID

export default userRouter;
