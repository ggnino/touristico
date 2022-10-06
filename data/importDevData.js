const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../models/tourModel');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');

// Set .env variable
dotenv.config({ path: '../config.env' });

// Set Database
const DB = process.env.DATABASE.replace(
	'<password>',
	process.env.DATABASE_PASSWORD
);

// Database Conncection
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => console.log('MongoDB connected.'))
	.catch((err) => console.log(`Error connectiong to database.\n${err}`));

// Read file data
const tourData = JSON.parse(
	fs.readFileSync(`${__dirname}/tours.json`, 'utf-8')
);
const userData = JSON.parse(
	fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
);
const reviewData = JSON.parse(
	fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);
// Function for importing data into the database
const importData = async () => {
	try {
		await Tour.create(tourData);
		await User.create(userData, { validateBeforeSave: false });
		await Review.create(reviewData);

		console.log('Data imported successfully!');
	} catch (err) {
		console.log(`Error importing data to DB.\n${err}`);
	}
	process.exit();
};
// Function for deleting data from the database
const deleteData = async () => {
	try {
		await Tour.deleteMany();
		await User.deleteMany();
		await Review.deleteMany();

		console.log('Data deleted successfully!');
	} catch (err) {
		console.log(`Error deleting data from DB.\n${err}`);
	}
	process.exit();
};
// Check node arguments for importation or deletion
if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();
