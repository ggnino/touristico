import React, { useEffect, useContext, useRef } from 'react';
import { isExpired } from 'react-jwt';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MyContext } from '../../utils/functions/context';

function PageLayout() {
	// useContext hook for state
	const state = useContext(MyContext);
	// useNavigate hook for redirecting
	const redirect = useNavigate();
	// destructuring state
	const {
		pageLayoutStyle,
		setPageLayoutStyle,
		auth,
		setAuth,
		settings,
		setSettings,
		userBorder,
		setUserBorder,
		layoutDisplay,
		setLayoutDisplay,
		setTextColor,
		textColor,
		setFont,
		modalDis,
		setUserMenu,
		path,
		setPath,
		setHide,
		style,
		setStyle,
	} = state;
	// Reference variable for an event
	const moveCheck = useRef(null);
	const location = useLocation();
	// useEffect hook for styling
	useEffect(() => {
		// if user is in home page
		if (path === '/home' && auth.isLoggedIn) {
			// set user settings
			// default color
			if (settings.defaultColor) {
				setUserBorder('#db0000');
				setStyle((style) => {
					return {
						...style,
						borderLeft: ``,
						borderRight: ``,
						boxShadow: ``,
					};
				});
			}
			// apply green color
			else if (settings.green) {
				setUserBorder('#B5F44A');
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #B5F44A`,
						borderRight: `4px solid #B5F44A`,
						boxShadow: `0 0 2rem #B5F44A`,
					};
				});
			}
			// apply yellow color
			else if (settings.yellow) {
				setUserBorder('#FFD400');
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #FFD400`,
						borderRight: `4px solid #FFD400`,
						boxShadow: `0 0 2rem #FFD400`,
					};
				});
			}
			// apply red color
			else if (settings.red) {
				setUserBorder('#960200');
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #960200`,
						borderRight: `4px solid #960200`,
						boxShadow: `0 0 2rem #960200`,
					};
				});
			}
			// apply blue color
			else if (settings.blue) {
				setUserBorder('#16697A');
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #16697A`,
						borderRight: `4px solid #16697A`,
						boxShadow: `0 0 2rem #16697A`,
					};
				});
			}
			// apply purple color
			else if (settings.purple) {
				setUserBorder('#820263');
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #820263`,
						borderRight: `4px solid #820263`,
						boxShadow: `0 0 2rem #820263`,
					};
				});
			}
			// apply grey color
			else if (settings.grey) {
				setUserBorder('#525252');
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #525252`,
						borderRight: `4px solid #525252`,
						boxShadow: `0 0 2rem #525252`,
					};
				});
			}
			// apply light theme
			if (settings.light) {
				setLayoutDisplay((l) => {
					return {
						display: 'none',
						backgroundImage: '',
						backgroundColor: 'white',
					};
				});
				setStyle((style) => {
					return {
						...style,
						backgroundColor: 'white',
					};
				});
			}
			// apply dark theme
			else if (settings.dark) {
				setLayoutDisplay((l) => {
					return {
						display: 'none',
						backgroundImage: '',
						backgroundColor: '',
					};
				});
				setStyle((style) => {
					return {
						...style,
						backgroundColor: '',
					};
				});
			}
		}
		// if user logged in and login component is displaying
		if (auth.isLoggedIn && pageLayoutStyle.class2.includes('login')) {
			// hide login component from user homepage display
			setLayoutDisplay((d) => {
				return {
					...d,
					display: 'none',
					backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), linear-gradient(to bottom, ${userBorder}, ${userBorder})`,
				};
			});
		}
		// user is logged in, set user background
		else if (auth.isLoggedIn) {
			// set user background style
			setLayoutDisplay((d) => {
				return {
					...d,
					backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), linear-gradient(to bottom, ${userBorder}, ${userBorder})`,
				};
			});
		}
		// hide user homepage if not logged in and display error
		else if (!auth.isLoggedIn && path === '/home') {
			// display error message
			setHide((h) => {
				return {
					...h,
					err: '',
				};
			});

			// set layout for error
			setLayoutDisplay((d) => {
				return {
					...d,
					display: '',
					backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), linear-gradient(to bottom, ${userBorder}, ${userBorder})`,
				};
			});
		}
		// clear any styles from auth page
		else if (!auth.isLoggedIn && !path.includes('/home')) {
			// clear any background style
			setLayoutDisplay((d) => {
				return {
					...d,
					display: '',
					backgroundImage: ``,
				};
			});
		}
		// if path is tours or tour page
		if (path.includes('tours')) {
			// set tours styling classes
			setPageLayoutStyle((s) => {
				return {
					...s,
					class1: `container tours tour page-layout`,
					class2: `tours-content tour-content content-layout`,
				};
			});
		} else {
			// apply proper styles if path do not match
			if (window.location.pathname !== path) setPath(window.location.pathname);
			// set page styling classses
			setPageLayoutStyle((s) => {
				return {
					...s,
					class1: `container ${path.slice(1, path.length)} page-layout`,
					class2: `${path.slice(1, path.length)}-content content-layout`,
				};
			});
		}
		// path is user home page
		if (auth.isLoggedIn && !moveCheck.current) {
			// event for authentication
			moveCheck.current = () => {
				// If web token expired reset state and log out
				if (
					(auth.jwt && isExpired(auth.jwt)) ||
					(location.state && isExpired(location.state.jwt))
				) {
					// reset layout state
					setLayoutDisplay((l) => {
						return {
							...l,
							display: '',
							backgroundImage: '',
							backgroundColor: '',
						};
					});
					// reset pagelayout border state
					setStyle((s) => {
						return {
							...s,
							backgroundColor: '',
							borderLeft: ``,
							borderRight: ``,
							boxShadow: ``,
						};
					});
					// reset user settings state
					setSettings({
						blue: false,
						light: false,
						default: true,
						defaultColor: false,
						purple: false,
						red: false,
						green: false,
						yellow: false,
						dark: false,
					});
					// reset usermenu state
					setUserMenu((u) => {
						return { ...u, menuItem4: 'none' };
					});
					// reset authentication state
					setAuth((a) => {
						return { ...a, isLoggedIn: false, expired: true, jwt: '' };
					});

					// reset text color state
					setTextColor('');
					// reset font state
					setFont('');
					// reset user border state
					setUserBorder('');
					// set path to login page
					setPath('/login');
					// redirect back to login page
					redirect('/login', { replace: true });
				}
			};
		}
		return () => {
			// if authenticatin has expired
			if (auth.expired === true) {
				// remove event
				moveCheck.current = () => {};
				// reset expiration
				setAuth((a) => {
					return {
						...a,
						expired: false,
					};
				});
			}
		};
	}, [
		location,
		path,
		setPath,
		setUserMenu,
		modalDis,
		auth,
		setAuth,
		redirect,
		setPageLayoutStyle,
		pageLayoutStyle.class2,
		settings,
		setUserBorder,
		userBorder,
		setLayoutDisplay,
		setSettings,
		setTextColor,
		textColor,
		setFont,
		setHide,
		setStyle,
	]);

	// Render component
	return (
		<div
			onMouseMove={moveCheck.current}
			className={pageLayoutStyle.class1}
			style={
				pageLayoutStyle.class1.includes('login')
					? layoutDisplay
					: path === '/home' && !auth.isLoggedIn
					? layoutDisplay
					: {
							display: '',
							backgroundImage: layoutDisplay.backgroundImage,
							backgroundColor: layoutDisplay.backgroundColor,
							scrollbarColor: userBorder + ' black',
					  }
			}
		>
			<div
				className={pageLayoutStyle.class2}
				style={
					path === '/home' ? style : { overflow: pageLayoutStyle.overflow }
				}
			>
				<Outlet />
			</div>
		</div>
	);
}

export default PageLayout;
