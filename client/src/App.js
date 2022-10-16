import React, { useState } from 'react';
import MainPage from './components/main-page-component/main-page-component.jsx';
import './App.scss';
import AboutPage from './components/about-page-component/about-page-component.jsx';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import BenefitsPage from './components/benefits-page-component/benefits-page-component.jsx';
import Signup from './components/signup-component/signup-component.jsx';
import LoginPage from './components/login-page-component/login-page-component.jsx';
import ToursPage from './components/tours-page-component/tours-page-component.jsx';
import { MyContext } from './utils/functions/context.js';
import TourPage from './components/tour-page-component/tour-page-component.jsx';
import PageLayout from './components/page-layout-component/page-layout-component.jsx';
import Nav from './components/nav-component/nav-component.jsx';
import UserPage from './components/user-page-component/user-page-component.jsx';
import { isExpired } from 'react-jwt';
import img1 from './imgs/close.png';
import img2 from './imgs/close2.png';
import img3 from './imgs/add.png';
import img4 from './imgs/add-hover.png';

function App() {
	// variable for location
	const loc = useLocation();
	/***************  Error set up *******************/

	// useState hook for displaying loader component and err component
	const [hide, setHide] = useState({
		display1: '',
		display2: '',
		loader: '',
		err: 'none',
	});
	// useState hook for showing different error messages
	const [msg, setMsg] = useState('');

	/***************  Button set up *******************/

	// useState hook for modal close button
	const [img, setImg] = useState({ img: img2, name: 2 });
	// useState hook for setting button image
	const [btnImage, setBtnImage] = useState({ img: img3, imgName: 3 });
	// useState hook for button icon
	const [btnStyle, setBtnStyle] = useState({ display: 'none' });

	/***************  Mapbox set up *******************/

	// useState hook for longitudes coordinates
	const [lng, setLng] = useState(-80.185942);
	// useState hook for latitude coordinates
	const [lat, setLat] = useState(25.774772);
	// useState hook for map zoom level
	const [zoom, setZoom] = useState(5);
	// useState hook for location coordinates
	const [locations, setLocations] = useState([
		[-80.128473, 25.781842],
		[-80.647885, 24.909047],
		[-81.0784, 24.707496],
		[-81.768719, 24.552242],
	]);

	/***************  Tour set up *******************/

	// useState hook for all tours data
	const [tours, setTours] = useState([]);
	// useState hook for tour data
	const [myTour, setMyTour] = useState(null);
	// useState hook for tour guides
	const [guides, setGuides] = useState([]);
	// useState hook for tour bg images
	const [bg, setBg] = useState({ img: '', img2: '', img3: '', img4: '' });
	// useState hook for tour page mount
	const [isMountedTourPage, setIsMountedTourPage] = useState(true);
	// useState hook for setting tour reviews
	const [reviews, SetReviews] = useState({});

	/***************  Navbar set up *******************/

	// useState hook for component refrences for observer API
	const [mainRefs, setMainRefs] = useState({
		info: null,
		mio: null,
		main: null,
		head: null,
		tour: null,
		rev: null,
		book: null,
		footer: null,
	});
	// useState hook for navbar items
	const [navStyle, setNavStyle] = useState({
		backgroundColor: '',
		borderBottom: '',
		boxShadow: '',
		color: '',
		decoration: 'underline',
		class: 'nav',
		displayItems: '',
	});
	const [path, setPath] = useState(window.location.pathname);
	/***************  User settings set up *******************/

	// useState hook for userBorder
	const [userBorder, setUserBorder] = useState('');
	// useState hook for user settings
	const [settings, setSettings] = useState({
		blue: false,
		light: false,
		defaultColor: false,
		default: true,
		purple: false,
		red: false,
		green: false,
		yellow: false,
		dark: false,
		selectionval: '',
		selectionval2: '',
		selectionval3: '',
	});
	// useState hook for changing theme text color
	const [textColor, setTextColor] = useState('');
	// useState hook for changing theme font
	const [font, setFont] = useState('');
	// useState hook for user authentication
	const [auth, setAuth] = useState({
		isLoggedIn: false,
		email: '',
		name: '',
		password: '',
		passwordConfirm: '',
		expired: false,
		jwt: '',
	});
	// useState hook for usermenu styling
	const [userMenu, setUserMenu] = useState({
		menuItem: '',
		menuItem2: 'none',
		menuItem3: 'none',
		menuItem4: 'none',
		menuItem5: 'none',
		menuItem6: 'none',
		border: {},
		borderColor: '',
		color: '',
		color2: '',
		color3: '',
		color4: '',
		color5: '',
		color6: '',
	});

	/***************  Modal set up *******************/

	// useState hook for displaying modal
	const [modalDis, setModalDis] = useState({
		display: 'none',
		open: false,
	});

	/***************  App Pageloyout set up *******************/
	// useState hook for pagelayout
	const [pageLayoutStyle, setPageLayoutStyle] = useState({
		class1: 'container page-layout',
		class2: 'content-layout',
		overflow: '',
	});
	const [style, setStyle] = useState({ boxShadow: '', border: '' });
	// useState hook for pagelayout styling
	const [layoutDisplay, setLayoutDisplay] = useState({
		display: '',
		backgroundColor: '',
		backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), linear-gradient(to bottom, ${userBorder}, ${userBorder})`,
	});

	// useState for user form styling
	const [userFormStyle, setUserFormStyle] = useState({
		display: '',
		display2: '',
		display3: 'none',
		display4: 'none',
		modTitle: '',
		btn: '',
	});

	/***************  User input set up *******************/

	// useState hook for retrieving user input
	const [input, setInput] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirm: '',
		passwordCurrent: '',
		photo: '',
		disabled: true,
	});
	// useState hook for setting user data
	const [user, setUser] = useState({
		name: '',
		email: '',
		photo: '',
		role: '',
	});
	// useNavigate hook for redirecting
	const redirect = useNavigate();

	/***************  onHandlers set up *******************/

	// onHover handler for switching button images
	const onHoverBtnImg = () => {
		if (btnImage.imgName === 3) setBtnImage({ img: img4, imgName: 4 });
		else setBtnImage({ img: img3, imgName: 3 });
	};
	// onHover handler for switching modal button images
	const onHoverModal = () => {
		if (img.name === 2) {
			setImg({ img: img1, name: 1 });
		} else setImg({ img: img2, name: 2 });
	};

	// onChange handler for user form component
	const onChange = (e, photo = null) => {
		// name of event target
		const name = e.target.name;
		// event target is valid photo
		if (name === 'photo' && photo.current.files.length > 0) {
			// set photo
			setInput((i) => {
				return { ...i, photo: photo.current.files[0] };
			});
		}
		// event target is not photo
		else if (name !== '')
			// set user input
			setInput((i) => {
				return {
					...i,
					[name]: e.target.value,
				};
			});
	};
	// onHover handler for navbar
	const onHoverNav = (e) => {
		// event type
		const event = e.type;
		// mouse enter event
		if (event === 'mouseenter') {
			// set user color
			setNavStyle((navStyle) => {
				return {
					...navStyle,
					color: userBorder,
				};
			});
		}
		// mouse leave event
		else if (event === 'mouseleave') {
			// remove user color
			setNavStyle((navStyle) => {
				return {
					...navStyle,
					color: 'inherit',
				};
			});
		}
	};
	// onClick handler for menu selection color
	const userMenuClicker = (e) => {
		const title = e.target.title;
		// user profile selected
		if (title === 'profile') {
			// show user profile
			setUserMenu((s) => {
				return {
					...s,
					menuItem: '',
					menuItem2: 'none',
					menuItem3: 'none',
					menuItem4: 'none',
					menuItem5: 'none',
					menuItem6: 'none',
					color: userBorder,
					color2: textColor,
					color3: textColor,
					color4: textColor,
					color5: textColor,
					color6: textColor,
				};
			});
		}
		// user rewards selected
		else if (title === 'rewards') {
			// show user rewards
			setUserMenu((s) => {
				return {
					...s,
					menuItem: 'none',
					menuItem2: '',
					menuItem3: 'none',
					menuItem4: 'none',
					menuItem5: 'none',
					menuItem6: 'none',
					color: textColor,
					color2: userBorder,
					color3: textColor,
					color4: textColor,
					color5: textColor,
					color6: textColor,
				};
			});
		}
		// user bookings selected
		else if (title === 'bookings') {
			// show user bookings component
			setUserMenu((s) => {
				return {
					...s,
					menuItem: 'none',
					menuItem2: 'none',
					menuItem3: '',
					menuItem4: 'none',
					menuItem5: 'none',
					menuItem6: 'none',
					color: textColor,
					color2: textColor,
					color3: userBorder,
					color4: textColor,
					color5: textColor,
					color6: textColor,
				};
			});
		}
		// user admin selected tours
		else if (title === 'tours') {
			// show admin tours component
			setUserMenu((s) => {
				return {
					...s,
					menuItem: 'none',
					menuItem2: 'none',
					menuItem3: 'none',
					menuItem4: '',
					menuItem5: 'none',
					menuItem6: 'none',
					color: textColor,
					color2: textColor,
					color3: textColor,
					color4: userBorder,
					color5: textColor,
					color6: textColor,
				};
			});
		}
		// user admin selected users
		else if (title === 'users') {
			// show admin users component
			setUserMenu((s) => {
				return {
					...s,
					menuItem: 'none',
					menuItem2: 'none',
					menuItem3: 'none',
					menuItem4: 'none',
					menuItem5: '',
					menuItem6: 'none',
					color: textColor,
					color2: textColor,
					color3: textColor,
					color4: textColor,
					color5: userBorder,
					color6: textColor,
				};
			});
		}
		// user selected settings
		else if (title === 'settings') {
			// show user settings
			setUserMenu((s) => {
				return {
					...s,
					menuItem: 'none',
					menuItem2: 'none',
					menuItem3: 'none',
					menuItem4: 'none',
					menuItem5: 'none',
					menuItem6: '',
					color: textColor,
					color2: textColor,
					color3: textColor,
					color4: textColor,
					color5: textColor,
					color6: userBorder,
				};
			});
		}
	};
	// onHover handler for hover effect on user menu
	const hoverEffectUserPage = (e) => {
		// element title
		const title = e.target.title;
		// event type
		const event = e.type;
		// cursor on profile
		if (title === 'profile') {
			// add user color on mouse enter
			if (event === 'mouseenter')
				setUserMenu((s) => {
					return { ...s, color: userBorder };
				});
			// maintain user color while still selected
			else if (event === 'mouseleave' && userMenu.menuItem === '')
				setUserMenu((s) => {
					return { ...s, color: userBorder };
				});
			// remove user color on mouse leave
			else
				setUserMenu((s) => {
					return { ...s, color: textColor };
				});
		}
		// cursor on rewards
		else if (title === 'rewards') {
			// add user color on mouse enter
			if (event === 'mouseenter')
				setUserMenu((s) => {
					return { ...s, color2: userBorder };
				});
			// maintain user color while still selected
			else if (event === 'mouseleave' && userMenu.menuItem2 === '')
				setUserMenu((s) => {
					return { ...s, color2: userBorder };
				});
			// remove user color on mouse leave
			else
				setUserMenu((s) => {
					return { ...s, color2: textColor };
				});
		}
		// cursor on bookings
		else if (title === 'bookings') {
			// add user color on mouse enter
			if (event === 'mouseenter')
				setUserMenu((s) => {
					return { ...s, color3: userBorder };
				});
			// maintain user color while still selected
			else if (event === 'mouseleave' && userMenu.menuItem3 === '')
				setUserMenu((s) => {
					return { ...s, color3: userBorder };
				});
			// remove user color on mouse leave
			else
				setUserMenu((s) => {
					return { ...s, color3: textColor };
				});
		}
		// cursor on tours
		else if (title === 'tours') {
			// add user color on mouse enter
			if (event === 'mouseenter')
				setUserMenu((s) => {
					return { ...s, color4: userBorder };
				});
			// maintain user color while still selected
			else if (event === 'mouseleave' && userMenu.menuItem4 === '')
				setUserMenu((s) => {
					return { ...s, color4: userBorder };
				});
			// remove user color on mouse leave
			else
				setUserMenu((s) => {
					return { ...s, color4: textColor };
				});
		}
		// cursor on users
		else if (title === 'users') {
			// add user color on mouse enter
			if (event === 'mouseenter')
				setUserMenu((s) => {
					return { ...s, color5: userBorder };
				});
			// maintain user color while still selected
			else if (event === 'mouseleave' && userMenu.menuItem5 === '')
				setUserMenu((s) => {
					return { ...s, color5: userBorder };
				});
			// remove user color on mouse leave
			else
				setUserMenu((s) => {
					return { ...s, color5: textColor };
				});
		}
		// cursor on settings
		else if (title === 'settings') {
			// add user color on mouse enter
			if (event === 'mouseenter')
				setUserMenu((s) => {
					return { ...s, color6: userBorder };
				});
			// maintain user color while still selected
			else if (event === 'mouseleave' && userMenu.menuItem6 === '')
				setUserMenu((s) => {
					return { ...s, color6: userBorder };
				});
			// remove user color on mouse leave
			else
				setUserMenu((s) => {
					return { ...s, color6: textColor };
				});
		}
	};
	// onClick handler
	const clicker = async (e) => {
		// element title
		const title = e.target.title;
		e.preventDefault();

		// user clicked log out button
		if (title === 'logOut') {
			// set authentication
			setAuth((auth) => {
				return {
					...auth,
					isLoggedIn: false,
					expired: true,
					jwt: '',
				};
			});
			// clear any user defined settings
			setStyle((style) => {
				return {
					...style,
					boxShadow: '',
					borderLeft: '',
					borderRight: '',
				};
			});

			// clear user boder
			setUserBorder('');
			// clear user font
			setFont('');
			// clear user text color
			setTextColor('');
			// set path to homepage
			setPath('/');
			// redirect to homepage
			redirect('/', { replace: true });
		}
		// user clicked on more tours button
		if (title === 'tours') {
			// set path to tours page
			setPath('/tours');
		}
		// user clicked on info component button
		if (title === '/about') {
			// set path to about us page
			setPath('/about');
		}
		// user clicked the book now component button
		if (title === 'book') {
			console.log('Continue.....lol');
			// set path to signup page
			setPath('/signup');
			// redirect to signup page with user input
			redirect('/signup', {
				state: { name: input.name, email: input.email },
				// replace: true,
			});
		}

		// Check if the click event was triggered in user profile
		if (title === 'user-profile') {
			// Check if the button text is save
			if (e.target.outerText === 'Save') {
				console.log('Continue.....ppppppppp');
				// Variables
				const pws = {};
				let fd = new FormData();

				// Check if inputs are not empty and not the same user info already saved
				if (
					(input.name !== '' && input.name !== user.name) ||
					(input.email !== user.email && input.email !== '') ||
					(input.currentPassword !== '' &&
						input.password !== '' &&
						input.passwordConfirm !== '') ||
					input.photo !== ''
				) {
					// Organize form data
					Object.keys(input).forEach((prop) => {
						if (prop.includes('password')) pws[prop] = input[prop];
						else if (input[prop]) {
							if (prop === 'photo') {
								console.log('photo!');
								fd.append(prop, input[prop], input[prop].name);
							} else fd.append(prop, input[prop]);
						}
					});

					try {
						// user passwird was updated
						if (pws['password']) {
							// Update user password
							await axios.patch(`api/v1/users/updatePassword`, pws);
						}
						// variable for response
						let res = null;
						// update user data
						res = await axios.patch(`api/v1/users/updateMe`, fd);
						// response has user photo
						if (res.data.photo)
							// set user photo
							setUser((u) => {
								return {
									...u,
									photo: res.data.photo,
								};
							});

						// clear any err meassages
						setAuth((s) => {
							return {
								...s,
								isLoggedIn: true,
								expired: false,
							};
						});
					} catch (err) {
						// show err message
						setAuth((s) => {
							return { ...s, expired: err.response.data.message };
						});
					}
				}
			}
			// Toggle edit user
			setInput((i) => {
				return {
					...i,
					disabled: !i.disabled,
				};
			});
		}
		// user settings clicked
		if (title === 'settings') {
			const userSettings = {};
			for (let prop in settings) {
				if (settings[prop]) userSettings[prop] = settings[prop];
			}
			try {
				// update user settings
				await axios.patch(`api/v1/users/updateMe`, {
					userSettings,
				});
			} catch (err) {
				console.log(err);
			}

			redirect('/home', { state: { ...loc.state, userSettings } });
			// set authentication
			// setAuth((a) => {
			// 	return { ...a, isLoggedIn: true, jwt: loc.state.jwt || a.jwt };
			// });
		}

		// sign up component btn clicked
		if (path === '/signup' && title !== '/signup' && title !== 'book') {
			try {
				// destructuring user input
				const { name, email, password, passwordConfirm } = input;
				// signing up new user
				await axios.post('api/v1/users/signup', {
					name,
					email,
					password,
					passwordConfirm,
				});
				// reset user input
				setInput((i) => {
					return {
						...i,
						name: '',
						email: '',
						password: '',
						passwordConfirm: '',
					};
				});
				// clear any err messages
				if (auth.expired || !auth.err) {
					console.log('nothere');
					setHide((h) => {
						return { ...h, err: 'none' };
					});
					setAuth((a) => {
						return { ...a, expired: '' };
					});
				}
				setPath('/login');
				// redirect to login page
				redirect('/login', { replace: true });
			} catch (err) {
				// show err message
				setHide((h) => {
					return { ...h, err: '' };
				});
				// send error info
				setAuth((s) => {
					return { ...s, expired: err.response.data.message };
				});
			}
		}
		// on login page
		else if (path === '/login') {
			let res = null;
			try {
				// logging in user
				res = await axios.post('api/v1/users/login', {
					email: input.email,
					password: input.password,
				});
			} catch (err) {
				// send error info
				setAuth((s) => {
					return { ...s, expired: err.response.data.message };
				});
				// show error message
				setHide((h) => {
					return { ...h, err: '' };
				});
			}
			// set authentication
			setAuth((s) => {
				return {
					...s,
					isLoggedIn: true,
					jwt: res.data.token,
					expired: isExpired(res.data.token),
				};
			});
			// reset user input
			setInput((i) => {
				return {
					...i,
					name: '',
					email: '',
					password: '',
					passwordConfirm: '',
				};
			});
			// any saved user settings
			if (res.data.user.userSettings) {
				// set user settings
				setSettings((s) => {
					return { ...s, ...res.data.user.userSettings };
				});
				// any saved font not default
				if (res.data.user.userSettings.default !== true)
					setFont(res.data.user.userSettings.default);
			}

			// set user data
			setUser({
				name: res.data.user.name,
				email: res.data.user.email,
				photo: res.data.user.photo,
				role: res.data.user.role,
			});

			setPath('/home');
			// redirect to user homepage
			redirect('/home', {
				state: {
					name: res.data.user.name,
					email: res.data.user.email,
					photo: res.data.user.photo,
					role: res.data.user.role,
					jwt: res.data.token,
					userSettings: res.data.user.userSettings,
					expired: isExpired(res.data.token),
				},
				replace: true,
			});
			if (auth.expired)
				// hide any input errors
				setHide((h) => {
					return { ...h, err: 'none' };
				});
		}
		// modal was clicked open
		else if (title === '#openModal') {
			// set display modal
			setModalDis({ display: '', open: true });
			// set overflow hidden on layout
			setPageLayoutStyle((s) => {
				return {
					...s,
					overflow: 'hidden',
				};
			});
		}
		// modal was clicked closed
		else if (title === 'close') {
			// set default overflow on layout
			setPageLayoutStyle((s) => {
				return {
					...s,
					overflow: '',
				};
			});
			// hide modal
			setModalDis({ display: 'none', open: false });
		}
	};

	// onClick handler for user settings selection
	const selClicker = (e) => {
		const title = e.target.value;
		// user selected the dark option
		if (title === 'dark') {
			setSettings((s) => {
				return {
					...s,
					light: false,
					dark: true,
					selectionval3: e.target.value,
				};
			});
		}
		// user selected the light option
		if (title === 'light') {
			setSettings((s) => {
				return {
					...s,
					light: true,
					dark: false,
					selectionval3: e.target.value,
				};
			});
		}
		// user selected color blue
		if (title === 'blue') {
			setSettings((s) => {
				return {
					...s,
					blue: true,
					defaultColor: false,
					purple: false,
					red: false,
					green: false,
					yellow: false,
					grey: false,
					selectionval: e.target.value,
				};
			});
		}
		// user selected color default
		else if (title === 'defaultColor') {
			setSettings((s) => {
				return {
					...s,
					blue: false,
					defaultColor: true,
					purple: false,
					red: false,
					green: false,
					yellow: false,
					grey: false,
					selectionval: e.target.value,
				};
			});
		}
		// user selected color purple
		if (title === 'purple') {
			setSettings((s) => {
				return {
					...s,
					blue: false,
					defaultColor: false,
					purple: true,
					red: false,
					green: false,
					yellow: false,
					grey: false,
					selectionval: e.target.value,
				};
			});
		}
		// user selected color red
		if (title === 'red') {
			setSettings((s) => {
				return {
					...s,
					blue: false,
					defaultColor: false,
					purple: false,
					red: true,
					green: false,
					yellow: false,
					grey: false,
					selectionval: e.target.value,
				};
			});
		}
		// user selected color green
		if (title === 'green') {
			setSettings((s) => {
				return {
					...s,
					blue: false,
					defaultColor: false,
					purple: false,
					red: false,
					green: true,
					yellow: false,
					grey: false,
					selectionval: e.target.value,
				};
			});
		}
		// user selected color yellow
		if (title === 'yellow') {
			setSettings((s) => {
				return {
					...s,
					blue: false,
					defaultColor: false,
					purple: false,
					red: false,
					green: false,
					yellow: true,
					grey: false,
					selectionval: e.target.value,
				};
			});
		}
		// user selected color grey
		if (title === 'grey') {
			setSettings((s) => {
				return {
					...s,
					blue: false,
					defaultColor: false,
					purple: false,
					red: false,
					green: false,
					yellow: false,
					grey: true,
					selectionval: e.target.value,
				};
			});
		}
		// user selected font smooth
		if (title === 'smooth') {
			setFont('aviano-future');
			setSettings((s) => {
				return {
					...s,
					default: 'aviano-future',
					selectionval2: e.target.value,
				};
			});
		}
		// user selected font default
		if (title === 'default') {
			setFont('');
			setSettings((s) => {
				return {
					...s,
					default: true,
					selectionval2: e.target.value,
				};
			});
		}
		// user selected font touristico
		if (title === 'touristico') {
			setFont('bookmania');
			setSettings((s) => {
				return {
					...s,
					default: 'bookmania',
					selectionval2: e.target.value,
				};
			});
		}
	};

	// Render app
	return (
		<MyContext.Provider
			value={{
				path,
				setPath,
				btnStyle,
				setBtnStyle,
				myTour,
				setMyTour,
				isMountedTourPage,
				setIsMountedTourPage,
				btnImage,
				onHoverBtnImg,
				userMenuClicker,
				hoverEffectUserPage,
				userFormStyle,
				setUserFormStyle,
				reviews,
				SetReviews,
				mapBoxSettings: {
					bg,
					setBg,
					zoom,
					setZoom,
					setLocations,
					lng,
					setLng,
					lat,
					setLat,
					locations,
				},
				onHoverNav,
				img,
				onHoverModal,
				msg,
				setMsg,
				guides,
				setGuides,
				mainRefs,
				setMainRefs,
				navStyle,
				setNavStyle,
				pageLayoutStyle,
				setPageLayoutStyle,
				hide,
				setHide,
				clicker,
				modalDis,
				setModalDis,
				auth,
				setAuth,
				settings,
				setSettings,
				font,
				setFont,
				userBorder,
				setUserBorder,
				textColor,
				setTextColor,
				layoutDisplay,
				setLayoutDisplay,
				tours,
				setTours,
				userMenu,
				setUserMenu,
				input,
				setInput,
				user,
				setUser,
				onChange,
				style,
				setStyle,
				selClicker,
			}}
		>
			<Nav />
			<Routes>
				<Route exact path="/" element={<MainPage />} />
				<Route path="/*" element={<PageLayout />}>
					<Route path="about" element={<AboutPage />} />
					<Route path="benefits" element={<BenefitsPage />} />
					<Route path="signup" element={<Signup />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="tours/" element={<ToursPage />} />
					<Route path="tours/*" element={<TourPage />} />
					<Route path="home" element={<UserPage />} />
				</Route>
			</Routes>
		</MyContext.Provider>
	);
}

export default App;
