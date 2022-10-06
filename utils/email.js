const nodemailer = require('nodemailer');
const fs = require('fs');
const { htmlToText } = require('html-to-text');

module.exports = class Email {
	constructor(user, url) {
		this.to = user.email;
		this.firstName = user.name.split(' ')[0];
		this.url = url;
		this.from = `Touristico Admin ${process.env.EMAIL_FROM}`;
	}
	// Method for creating reusable transporter object using the SMTP transport
	createTransport() {
		// Send emails with SendGrid service in production
		if (process.env.NODE_ENV === 'production') {
			return nodemailer.createTransport({
				service: 'SendGrid',
				auth: {
					user: process.env.SENDGRID_USERNAME,
					pass: process.env.SENDGRID_PASSWORD,
				},
			});
		}
		// Send emails with mailtrap.io service in development
		return nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}
	// Method for sending the actual email
	async send(template, subject) {
		// Read HTML email template
		let html = fs.readFileSync(`${__dirname}/../templates/template.html`, {
			encoding: 'utf8',
		});
		// Add in user name
		html = html.replace('__user__', this.firstName);

		if (template === 'welcome') {
			// Add welcome message
			html = html.replace(
				'__user_message__',
				"Welcome to Touristico!, we're very glad to have you onboard."
			);
			// Add membership message
			html = html.replace(
				'__user_message2__',
				'Enjoy our membership rewards program. Earn points, discounts and more.<br> Click on the button below to login and get started.'
			);
			// Add info to email button
			html = html.replace('__url__', this.url);
			html = html.replace('__action__', 'Login');
		} else if (template === 'forgotPW') {
			// Add forgot message
			html = html.replace(
				'__user_message__',
				`Did you forget your password? Send a reset password request.`
			);
			// Add disregard message
			html = html.replace(
				'__user_message2__',
				'If you did not forget your password; please, disregard this email.'
			);
			// Add info to email button
			html = html.replace('__url__', this.url);
			html = html.replace('__action__', 'Reset');
		}
		// Email options
		const mailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html,
			text: htmlToText(html),
		};
		// Await email sent status
		const mailStatus = await this.createTransport().sendMail(mailOptions);
		// Return email status
		if (mailStatus) return 'sent';
		else return null;
	}
	// Method for sending the welcome email
	async sendWelcome() {
		return await this.send('welcome', 'Welcome to Touristico Tours');
	}
	// Method for sending the reset password email
	async sendResetToken() {
		return await this.send(
			'forgotPW',
			'***This is your Reset Password Token!***'
		);
	}
};
