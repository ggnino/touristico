import React, { useContext, useEffect, useRef } from 'react';
import { MyContext } from '../../utils/functions/context';
import Button from '../button-component/button-component';
import ErrorComponent from '../error-component/error-component';
import './user-form-component-styles.scss';

function UserForm(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const {
		settings,
		font,
		textColor,
		userBorder,
		input,
		user,
		auth,
		clicker,
		setAuth,
		setHide,
		onChange,
		userFormStyle,
		setUserFormStyle,
		userMenu,
		path,
		selClicker,
	} = state;

	// reference variables
	const userVal = useRef(); // user value
	const photo = useRef(null); // user photo
	// useEffect hook for userForm styling
	useEffect(() => {
		//  on login page hide password confirm element
		if (path === '/login') {
			setUserFormStyle((s) => {
				return {
					...s,
					display: '',
					display2: 'none',
					display3: 'none',
					display4: 'none',
					modTitle: '',
					btn: '',
				};
			});
		}
		// on user homepage
		else if (path === '/home') {
			// if viewing user profile component
			if (props.class === 'user-profile' && userMenu.menuItem !== 'none') {
				// show email and password confirm elements
				// hide user settings and tour info elements
				// change btn message on input element disabled toggle to save
				if (!input.disabled) {
					setUserFormStyle({
						display: '',
						display2: '',
						display3: 'none',
						display4: 'none',
						modTitle: ' ',
						btn: 'Save',
					});
				}
				// change btn message on input element disabled toggle to edit profile
				else {
					setUserFormStyle({
						display: '',
						display2: '',
						display3: 'none',
						display4: 'none',
						modTitle: ' ',
						btn: 'Edit Profile',
					});
				}
			}
			// if viewing user settings component
			else if (props.class === 'settings' && userMenu.menuItem6 !== 'none') {
				// hide email,password confirm,tour info, elements
				// show user settings elements
				// change component title
				setUserFormStyle({
					display: 'none',
					display2: 'none',
					display3: 'none',
					display4: '',
					modTitle: 'Customize',
					btn: 'Save',
				});
			}
			// else user viewing tour info component
			else if (props.class === 'modal' && userMenu.menuItem4 !== 'none') {
				// hide email,password confirm,user settings elements
				// show tour info elements
				// change component title
				setUserFormStyle({
					display: 'none',
					display2: 'none',
					display3: '',
					display4: 'none',
					modTitle: 'Tour Info',
					btn: 'Save',
				});
			}
		}

		// if user web token expired, show expiration err message
		if (auth.expired === true) {
			// show err message
			setHide((h) => {
				return { ...h, err: '' };
			});
			// reset expiration
			setAuth((a) => {
				return {
					...a,
					expired: false,
				};
			});
		}
	}, [
		path,
		props.class,
		props.display,
		userFormStyle.modTitle,
		setUserFormStyle,
		setHide,
		input.disabled,
		setAuth,
		auth.expired,
		userMenu,
	]);

	// Render component
	return (
		<form
			onKeyDown={(e) => {
				if (path === '/login' || path === '/signup') {
					if (e.code === 'Enter' || e.code === 'NumpadEnter') clicker(e);
				}
			}}
			onChange={(e) => onChange(e, photo)}
			className={`${props.class}-content-form my-form`}
			style={
				(settings.light && props.class === 'settings') ||
				(settings.light && props.class === 'modal')
					? {
							display: userFormStyle.mainDis || props.display,
							borderColor: userBorder,
							backgroundColor: 'white',
							boxShadow: `0 0 4rem ${userBorder}`,
							scrollbarColor: `${userBorder} black`,
					  }
					: settings.light && props.class === 'user-profile'
					? {
							display: userFormStyle.mainDis || props.display,
							borderColor: userBorder,
							backgroundColor: 'white',
							boxShadow: `none`,
							scrollbarColor: `${userBorder} black`,
					  }
					: props.class === 'modal'
					? {
							display: userFormStyle.mainDis || props.display,
							borderColor: userBorder,
							backgroundColor: '',
							boxShadow: `0 0 4rem ${userBorder}`,
							scrollbarColor: `${userBorder} black`,
					  }
					: {
							display: userFormStyle.mainDis || props.display,
							borderColor: userBorder,
							backgroundColor: '',
							scrollbarColor: `${userBorder} black`,
					  }
			}
		>
			<h2 className="my-heading" style={{ color: textColor, fontFamily: font }}>
				{userFormStyle.modTitle ||
					props.class.replace(
						`${props.class[0]}`,
						`${props.class[0].toUpperCase()}`
					)}
			</h2>
			<ErrorComponent />

			<fieldset
				style={{ display: userFormStyle.display4 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
				onClick={selClicker}
				tabIndex="0"
			>
				<select
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					// title="Color"
					value={settings.selectionval}
					readOnly={true}
					tabIndex={0}
					name="color"
				>
					<option readOnly={true} value="defaultColor" title="a" tabIndex={0}>
						Default
					</option>
					<option readOnly={true} value="blue" title="x" tabIndex={0}>
						Wavy Blue
					</option>
					<option readOnly={true} value="red" title="s" tabIndex={0}>
						Wineberry Red
					</option>
					<option readOnly={true} value="green" title="dw" tabIndex={0}>
						Cosmo Green
					</option>
					<option readOnly={true} value="yellow" title="w" tabIndex={0}>
						Radiant Yellow
					</option>
					<option readOnly={true} value="grey" title="qq" tabIndex={0}>
						Robotic Grey
					</option>
					<option readOnly={true} value="purple" title="eee" tabIndex={0}>
						Galactic Purple
					</option>
				</select>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="color"
					aria-label="Color:"
				>
					Color:
				</label>
			</fieldset>
			<fieldset
				style={{ display: userFormStyle.display4 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
				onClick={selClicker}
			>
				<select
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					value={settings.selectionval2}
					readOnly={true}
					name="font"
				>
					<option readOnly={true} value="default">
						Default
					</option>
					<option readOnly={true} value="touristico">
						Touristico
					</option>
					<option readOnly={true} value="smooth">
						Mr. Smooth
					</option>
				</select>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="font"
				>
					Font:
				</label>
			</fieldset>
			<fieldset
				style={{ display: userFormStyle.display4 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
				onClick={selClicker}
			>
				<select
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					value={settings.selectionval3}
					readOnly={true}
					name="theme"
				>
					<option readOnly={true} value="dark">
						Dark
					</option>
					<option readOnly={true} value="light">
						Light
					</option>
				</select>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="theme"
				>
					Theme:
				</label>
			</fieldset>
			<fieldset
				style={{
					display:
						userFormStyle.display2 === 'none' ? userFormStyle.display3 : '',
				}}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					type="text"
					name="name"
					placeholder="Name:"
					defaultValue={
						props.class === 'user-profile'
							? user.name
							: input.name
							? input.name
							: ''
					}
					disabled={props.class === 'user-profile' ? input.disabled : false}
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="Name"
				>
					Name:
				</label>
			</fieldset>

			<fieldset
				style={{ display: userFormStyle.display }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					type="email"
					name="email"
					placeholder="Email:"
					defaultValue={
						props.class === 'user-profile'
							? user.email
							: input.email
							? input.email
							: ''
					}
					disabled={props.class === 'user-profile' ? input.disabled : false}
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="email"
				>
					Email:
				</label>
			</fieldset>
			<fieldset
				style={
					props.class === 'user-profile' ? { display: '' } : { display: 'none' }
				}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					ref={userVal}
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					type="password"
					name="passwordCurrent"
					aria-label="passwordCurrent"
					placeholder="Current Password:"
					disabled={props.class === 'user-profile' ? input.disabled : false}
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="passwordCurrent"
				>
					Current Password:
				</label>
			</fieldset>
			<fieldset
				style={{ display: userFormStyle.display }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					type="password"
					name="password"
					placeholder="Password:"
					defaultValue={props.class === 'user-profile' ? '**********' : ''}
					disabled={props.class === 'user-profile' ? input.disabled : false}
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="password"
				>
					Password:
				</label>
			</fieldset>

			<fieldset
				style={{ display: userFormStyle.display2 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					type="password"
					name="passwordConfirm"
					placeholder="Confirm Password:"
					defaultValue={props.class === 'user-profile' ? '**********' : ''}
					disabled={props.class === 'user-profile' ? input.disabled : false}
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="Confirm Password"
				>
					Confirm Password:
				</label>
			</fieldset>
			<fieldset
				className="my-formgroup"
				style={
					path === '/home'
						? { display: userFormStyle.display }
						: { display: 'none' }
				}
			>
				<input
					ref={photo}
					className="my-input file"
					style={{ color: textColor }}
					type="file"
					placeholder="My photo"
					name="photo"
					disabled={props.class === 'user-profile' ? input.disabled : false}
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
									color: textColor,
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
									color: textColor,
							  }
							: { fontFamily: font, color: textColor }
					}
					className="my-label"
					htmlFor="photo"
				>
					My Photo:
				</label>
			</fieldset>
			<fieldset
				style={{ display: userFormStyle.display3 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					type="number"
					name="duration"
					placeholder="Duration:"
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="duration"
				>
					Duration:
				</label>
			</fieldset>
			<fieldset
				style={{ display: userFormStyle.display3 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					type="text"
					name="group-size"
					placeholder="Max Group Size:"
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="group-size"
				>
					Max Group Size:
				</label>
			</fieldset>
			<fieldset
				style={{ display: userFormStyle.display3 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					type="text"
					name="difficulty"
					placeholder="Difficulty:"
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="difficulty"
				>
					Difficulty:
				</label>
			</fieldset>
			<fieldset
				style={{ display: userFormStyle.display3 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					type="text"
					name="ratings-avg"
					placeholder="Ratings Average:"
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="ratings-avg"
				>
					Ratings Average:
				</label>
			</fieldset>
			<fieldset
				style={{ display: userFormStyle.display3 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					type="number"
					name="ratings-quantity"
					placeholder="Ratings Quantity:"
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="ratings-quantity"
				>
					Ratings Quantity:
				</label>
			</fieldset>
			<fieldset
				style={{ display: userFormStyle.display3 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					type="text"
					name="price"
					placeholder="Price:"
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="price"
				>
					Price:
				</label>
			</fieldset>
			<fieldset
				style={{ display: userFormStyle.display3 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					type="text"
					name="summary"
					placeholder="Summary:"
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="summary"
				>
					Summary:
				</label>
			</fieldset>
			<fieldset
				style={{ display: userFormStyle.display3 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					type="text"
					name="description"
					placeholder="Description:"
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="description"
				>
					Description:
				</label>
			</fieldset>
			<fieldset
				style={{ display: userFormStyle.display3 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					className="my-input file"
					type="file"
					name="images"
					placeholder="Images:"
					style={{ color: textColor }}
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
									color: textColor,
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
									color: textColor,
							  }
							: { fontFamily: font, color: textColor }
					}
					className="my-label"
					htmlFor="images"
				>
					Images:
				</label>
			</fieldset>
			<fieldset
				style={{ display: userFormStyle.display3 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					type="text"
					name="start-dates"
					placeholder="Start Dates:"
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="start-dates"
				>
					Start Dates:
				</label>
			</fieldset>
			<fieldset
				style={{ display: userFormStyle.display3 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<input
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					type="text"
					name="location"
					placeholder="Location:"
				/>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="location"
				>
					Locations:
				</label>
			</fieldset>
			<fieldset
				style={{ display: userFormStyle.display3 }}
				className={`${props.class}-content-form-formgroup my-formgroup`}
			>
				<select
					className="my-input"
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					name="guides"
				>
					<option>Guide #1</option>
					<option>Guide #2</option>
					<option>Guide #3</option>
					<option>Guide #4</option>
				</select>
				<label
					style={
						font === 'bookmania'
							? {
									fontFamily: 'pill-gothic-900mg',
									fontStyle: 'oblique',
							  }
							: font === 'aviano-future'
							? {
									fontFamily: 'ff-good-headline-web-pro-com',
									fontStyle: 'italic',
							  }
							: { fontFamily: font }
					}
					className="my-label"
					htmlFor="guides"
				>
					Guides:
				</label>
			</fieldset>
			<Button
				msg={
					userFormStyle.btn ||
					`${props.class.replace(
						`${props.class[0]}`,
						`${props.class[0].toUpperCase()}`
					)}`
				}
				class={
					props.class === 'user-profile' ? 'home text-gradient book' : 'book'
				}
				link={
					props.class === 'user-profile' || props.class === 'settings'
						? props.class
						: '#!'
				}
			/>
		</form>
	);
}

export default UserForm;
