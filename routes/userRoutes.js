import { Router } from 'express';
const router = Router();
import { getGuides, getMe, getUser, uploadUserPhoto, resizePhoto, updateMe, deactivateAccount, getAllUsers, createUser, deleteUsers, updateUser, deleteUser } from '../controllers/userController.js';
import { login, signup, forgotPassword, resetPassword, protect, updatePassword, restrictTo } from '../controllers/authController.js';


router.route('/guides').get(getGuides);

// login route
router.route('/login').post(login);
// sign up route for new users
router.route('/signup').post(signup);
// forgot password route
router.route('/forgotPassword').post(forgotPassword);
// reset password route
router.route('/resetPassword/:token').patch(resetPassword);
// protect middleware for all routes below, must be logged in order to access routes
router.use(protect);
// update password route
router.route('/updatePassword').patch(updatePassword);
router.route('/me').get(getMe, getUser);

// update user data route
router
	.route('/updateMe')
	.patch(
		uploadUserPhoto,
		resizePhoto,
		updateMe
	);
// deactivate user account
router.route('/deactivateMe').patch(deactivateAccount);
// restrict permissions of the following routes to admin role
router.use(restrictTo('admin'));

router
	.route('/') // users route
	.get(getAllUsers) // get all users
	.post(createUser); // create a user
// admin route to delete all deactivated account
router.route('/id/deactivated/removeUsers').delete(deleteUsers);

router
	.route('/id/:id') // user ID route
	.get(getUser) // get user by ID
	.patch(updateUser) // update user by ID
	.delete(deleteUser); // delete user by ID

export default router;
