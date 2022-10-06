const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.route('/guides').get(userController.getGuides);

// login route
router.route('/login').post(authController.login);
// sign up route for new users
router.route('/signup').post(authController.signup);
// forgot password route
router.route('/forgotPassword').post(authController.forgotPassword);
// reset password route
router.route('/resetPassword/:token').patch(authController.resetPassword);
// protect middleware for all routes below, must be logged in order to access routes
router.use(authController.protect);
// update password route
router.route('/updatePassword').patch(authController.updatePassword);
router.route('/me').get(userController.getMe, userController.getUser);
// router.route('/me/photo/:image').get(userController.getUserImage);
// update user data route
router
	.route('/updateMe')
	.patch(
		userController.uploadUserPhoto,
		userController.resizePhoto,
		userController.updateMe
	);
// deactivate user account
router.route('/deactivateMe').patch(userController.deactivateAccount);
// restrict permissions of the following routes to admin role
router.use(authController.restrictTo('admin'));

router
	.route('/') // users route
	.get(userController.getAllUsers) // get all users
	.post(userController.createUser); // create a user
// admin route to delete all deactivated account
router.route('/id/deactivated/removeUsers').delete(userController.deleteUsers);

router
	.route('/id/:id') // user ID route
	.get(userController.getUser) // get user by ID
	.patch(userController.updateUser) // update user by ID
	.delete(userController.deleteUser); // delete user by ID

module.exports = router;
