import React, { useEffect, useContext, useState, useRef } from 'react';
import { isExpired } from 'react-jwt';
import { Outlet, useNavigate } from 'react-router-dom';
import { MyContext } from '../../utils/functions/context';

function PageLayout() {
	const [style, setStyle] = useState({ boxShadow: '', border: '' });

	const state = useContext(MyContext);
	const redirect = useNavigate();

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
	} = state;
	const moveCheck = useRef(null);
	const path = useRef(null);
	// useEffect hook for styling
	useEffect(() => {
		// current path
		path.current = window.location.pathname;
		// if user is in home page
		if (path.current === '/home') {
			// set user settings
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
			} else if (settings.green) {
				setUserBorder('#B5F44A');
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #B5F44A`,
						borderRight: `4px solid #B5F44A`,
						boxShadow: `0 0 2rem #B5F44A`,
					};
				});
			} else if (settings.yellow) {
				setUserBorder('#FFD400');
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #FFD400`,
						borderRight: `4px solid #FFD400`,
						boxShadow: `0 0 2rem #FFD400`,
					};
				});
			} else if (settings.red) {
				setUserBorder('#960200');
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #960200`,
						borderRight: `4px solid #960200`,
						boxShadow: `0 0 2rem #960200`,
					};
				});
			} else if (settings.blue) {
				setUserBorder('#16697A');
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #16697A`,
						borderRight: `4px solid #16697A`,
						boxShadow: `0 0 2rem #16697A`,
					};
				});
			} else if (settings.purple) {
				setUserBorder('#820263');
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #820263`,
						borderRight: `4px solid #820263`,
						boxShadow: `0 0 2rem #820263`,
					};
				});
			} else if (settings.grey) {
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
			} else if (settings.dark) {
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
		// hide login component from user homepoge
		if (auth.isLoggedIn && pageLayoutStyle.class2.includes('login')) {
			setLayoutDisplay((d) => {
				return {
					...d,
					display: 'none',
					backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), linear-gradient(to bottom, ${userBorder}, ${userBorder})`,
				};
			});
		}
		// user is logged in, set user background
		if (auth.isLoggedIn) {
			setLayoutDisplay((d) => {
				return {
					...d,
					backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), linear-gradient(to bottom, ${userBorder}, ${userBorder})`,
				};
			});
		}
		// hide user homepage if not logged in
		else if (!auth.isLoggedIn && path.current === '/home') {
			setLayoutDisplay((d) => {
				return {
					...d,
					display: 'none',
					backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), linear-gradient(to bottom, ${userBorder}, ${userBorder})`,
				};
			});
		}
		// current path is tour/s page
		if (path.current.includes('tours')) {
			// set tours styling classes
			setPageLayoutStyle((s) => {
				return {
					...s,
					class1: `container tours tour page-layout`,
					class2: `tours-content tour-content content-layout`,
				};
			});
		} else {
			// set current page styling classses
			setPageLayoutStyle((s) => {
				return {
					...s,
					class1: `container ${path.current.slice(
						1,
						path.current.length
					)} page-layout`,
					class2: `${path.current.slice(
						1,
						path.current.length
					)}-content content-layout`,
				};
			});
		}
		// current path is user home page
		if (path.current === '/home') {
			// event for authentication
			moveCheck.current = () => {
				// If web token expired reset state and log out
				if (isExpired(auth.jwt)) {
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
					// redirect back to login page
					redirect('/login');
				}
			};
		}
		// remove event
		if (auth.expired === true) {
			moveCheck.current = () => {};
		}
	}, [
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
	]);
	// Render component
	return (
		<div
			onMouseMove={moveCheck.current}
			className={pageLayoutStyle.class1}
			style={
				pageLayoutStyle.class1.includes('login')
					? layoutDisplay
					: path.current === '/home' && !auth.isLoggedIn
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
					path.current === '/home'
						? style
						: { overflow: pageLayoutStyle.overflow }
				}
			>
				<Outlet />
			</div>
		</div>
	);
}

export default PageLayout;
