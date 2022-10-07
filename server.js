const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Set path for .env variable
if (process.env.NODE_ENV === 'development')
	dotenv.config({ path: './config.env' });
const app = require('./app');
const DB = process.env.DATABASE.replace(
	'<password>',
	process.env.DATABASE_PASSWORD
);
if (process.env._ && process.env._.indexOf('heroku') !== -1) {
	console.log("I'm in Heroku!");
}
// Connect to database
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => console.log('MongoDB connected.'))
	.catch((err) => console.log(`Error: ${err}`));

// Server running on port
const server = app.listen(process.env.PORT, () =>
	console.log(`Server running on port: ${process.env.PORT}`)
);
// Some people say this way is bad, because you should handle every error immediatly; which is true.
// But by watching for these events, we use it as a safety net.
process.on('unhandledRejection', (err) => {
	console.log(`${err.name}: ${err.message}`);
	console.log('UNHANDLED REJECTION! SHUTTING DOWN....');
	// server.close() stops the server, any code that is pending will finish executing, while process.exit() ends it immediatly.
	// process.exit(0) means successfull clean exit...process.exit(1) means error app crash.
	server.close(() => process.exit(1));
});
process.on('uncaughtException', (err) => {
	console.log(`${err.name}: ${err.message}`);
	console.log('UNCAUGHT EXCEPTION! SHUTTING DOWN....');

	server.close(() => process.exit(1));
});
