import { Schema, model } from 'mongoose';
import pkg from 'validator';
import { randomBytes, createHash } from 'crypto';
import pkg2 from 'bcryptjs';
const { hash, compare } = pkg2;
const { isEmail } = pkg

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'User name is required.'],
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: [true, 'User email is required.'],
		validate: [isEmail, 'Enter a valid email address.'],
	},
	photo: {
		type: String,
		default: 'default.jpg',
	},
	role: {
		type: String,
		enum: ['user', 'lead-guide', 'guide', 'admin'],
		default: 'user',
	},
	password: {
		type: String,
		minlength: 8,
		select: false,
		required: [true, 'User password is required.'],
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please confirm your password.'],
		validate: {
			validator: function (value) {
				return this.password === value;
			},
			message: 'Passwords do not match.',
		},
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
	userSettings: Object,
});
// pre 'save' hook middleware for saving password
userSchema.pre('save', async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified('password')) return next();
	// hash user password with the cost of 13
	this.password = await hash(this.password, 13);
	// delete passwordConfirm field
	this.passwordConfirm = undefined;
	// next middleware in the stack
	next();
});
// pre 'save' hook middleware for changed password
userSchema.pre('save', function (next) {
	// Only run this function if password was actually modified or not a new document
	if (!this.isModified('password') || this.isNew) return next();
	// password changed time in milliseconds, accounting for the delay for issuing web token, knock off about a second
	this.passwordChangedAt = Date.now() - 1000;
	// next middleware in the stack
	next();
});

// Instance methods
// method for checking if password is correct
userSchema.methods.correctPassword = async function (userPW) {
	// compare saved password with user submitted password
	return await compare(userPW, this.password);
};
// method for checking if password has changed after certain time
userSchema.methods.changedPasswordAfter = function (timestamp) {
	if (this.passwordChangedAt) {
		// if password changed after the token has been released
		return timestamp < parseInt(this.passwordChangedAt.getTime() / 1000, 10);
	}
	// default return value
	return false;
};
// method for resetting user passsword
userSchema.methods.passwordReset = function () {
	// create reset password token
	const resetToken = randomBytes(32).toString('hex');
	// hash reset password token
	this.passwordResetToken = createHash('sha256')
		.update(resetToken)
		.digest('hex');
	// reset password token expires in 10 min. format in milliseconds
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
	// return token
	return resetToken;
};

const User = model('User', userSchema);

export default User;
