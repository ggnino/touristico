import React, { useContext, useEffect, useRef } from 'react';
import './nav-component-styles.scss';
import styleVars from '../../utils/styles/variables.scss';
import { MyContext } from '../../utils/functions/context';
import { scrollAnimation } from '../../utils/functions/functions';

function Nav() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// reference variables
	const path = useRef('');
	const styleFont = useRef('');
	// Destructuring state
	const {
		navStyle,
		setNavStyle,
		settings,
		font,
		textColor,
		setTextColor,
		onHoverNav,
		mainRefs,
		auth,
	} = state;

	// useEffect hook for nav styling
	useEffect(() => {
		// current window path
		path.current = window.location.pathname;
		// Scroll event for navbar animation
		if (path.current === '/') {
			scrollAnimation(
				mainRefs.head,
				mainRefs.info,
				mainRefs.tour,
				mainRefs.rev,
				mainRefs.book,
				setNavStyle,
				styleVars
			);
		}
		// Set navbar styling by path
		if (path.current !== '/' && !settings.light) {
			// console.log('clicked!', settings);
			setNavStyle((style) => {
				return {
					...style,
					backgroundColor: 'black',
				};
			});
		}
		if (auth.isLoggedIn) {
			setNavStyle((style) => {
				return {
					...style,
					displayItems: 'none',
				};
			});
		} else if (path.current !== '/home') {
			setNavStyle((style) => {
				return {
					...style,
					displayItems: '',
					class: 'nav',
				};
			});
		}

		if (path.current === '/signup') {
			setNavStyle((s) => {
				return {
					...s,
					borderBottom: `4px solid ${styleVars.color4}`,
					boxShadow: `0 0 2rem ${styleVars.color4}`,
					color: styleVars.color4,
				};
			});
		} else if (path.current === '/login') {
			console.log('RED', path);
			setNavStyle((style) => {
				return {
					...style,
					color: styleVars.color5,
					borderBottom: `4px solid ${styleVars.color5}`,
					boxShadow: `0 0 2rem ${styleVars.color5}`,
				};
			});
		} else if (path.current.includes('tour')) {
			setNavStyle((s) => {
				return {
					...s,
					borderBottom: `4px solid ${styleVars.color3}`,
					boxShadow: `0 0 2rem ${styleVars.color3}`,
					color: styleVars.color3,
				};
			});
		} else if (path.current === '/about') {
			setNavStyle((s) => {
				return {
					...s,
					borderBottom: `4px solid ${styleVars.color1}`,
					boxShadow: `0 0 2rem ${styleVars.color1}`,
					color: styleVars.color1,
				};
			});
		} else if (path.current === '/benefits') {
			setNavStyle((s) => {
				return {
					...s,
					borderBottom: `4px solid ${styleVars.color2}`,
					boxShadow: `0 0 2rem ${styleVars.color2}`,
					color: styleVars.color2,
				};
			});
		}
		// Set nav font
		if (font === '') styleFont.current = '';
		else if (font === 'bookmania') {
			styleFont.current = { fam: `pill-gothic-900mg`, s: 'oblique' };
		} else if (font === 'aviano-future') {
			styleFont.current = { fam: 'ff-good-headline-web-pro-com', s: 'italic' };
		}
		// user is logged in
		if (auth.isLoggedIn) {
			console.log('render', auth.isLoggedIn, settings);
			// set default navbar styling

			setNavStyle((style) => {
				return {
					...style,
					borderBottom: `4px solid ${styleVars.color5}`,
					boxShadow: `0 0 2rem ${styleVars.color5}`,
					color: 'inherit',
					displayItems: 'none',
				};
			});
			// user saved color settings blue
			if (settings.blue) {
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						borderBottom: `4px solid #16697A`,
						boxShadow: `0 0 2rem #16697A`,
					};
				});
			}
			// user saved color settings purple
			else if (settings.purple) {
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						borderBottom: `4px solid #820263`,
						boxShadow: `0 0 2rem #820263`,
					};
				});
			}
			// user saved color settings yellow
			else if (settings.yellow) {
				console.log('YELOOW');
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						borderBottom: `4px solid #FFD400`,
						boxShadow: `0 0 2rem #FFD400`,
					};
				});
			}
			// user saved color settings red
			else if (settings.red) {
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						borderBottom: `4px solid #960200`,
						boxShadow: `0 0 2rem #960200`,
					};
				});
			}
			// user saved color settings green
			else if (settings.green) {
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						borderBottom: `4px solid #B5F44A`,
						boxShadow: `0 0 2rem #B5F44A`,
					};
				});
			}
			// user saved color settings grey
			else if (settings.grey) {
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						borderBottom: `4px solid #525252`,
						boxShadow: `0 0 2rem #525252`,
					};
				});
			}
			// user saved color settings default
			else if (settings.defaultColor) {
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						borderBottom: `4px solid ${styleVars.color5}`,
						boxShadow: `0 0 2rem ${styleVars.color5}`,
					};
				});
			}
			// user saved theme settings light
			if (settings.light) {
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						backgroundColor: 'white',
						class: 'nav light',
					};
				});
			}
			// user saved theme settings dark
			else if (settings.dark) {
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						class: 'nav',
					};
				});
			}
		} else if (!auth.isLoggedIn) {
			console.log('color changed');

			setNavStyle((style) => {
				return {
					...style,
					// borderBottom: `4px solid ${styleVars.color5}`,
					// boxShadow: `0 0 2rem ${styleVars.color5}`,
					// color: 'inherit',
					class: 'nav',
					displayItems: '',
				};
			});
		}
	}, [
		setNavStyle,
		settings,
		setTextColor,
		textColor,
		mainRefs.head,
		mainRefs.info,
		mainRefs.tour,
		mainRefs.rev,
		mainRefs.book,
		auth,
		font,
	]);

	// Render component
	return (
		<div className={navStyle.class} style={navStyle}>
			<div className="nav-logo ">
				<a
					href="/"
					onClick={(e) => {
						if (path.current === '/home') return e.preventDefault();
						else return;
					}}
				>
					<h1
						className="text-gradient"
						style={
							path.current === '/home' ? { cursor: 'default' } : { cursor: '' }
						}
					>
						Touristico
					</h1>
				</a>
			</div>

			<ul>
				<li style={{ display: navStyle.displayItems }}>
					<a
						style={
							path.current === '/about'
								? { color: navStyle.color, textDecoration: navStyle.decoration }
								: {
										fontFamily: styleFont.current.fam,
										fontStyle: styleFont.current.s,
								  }
						}
						id="pp"
						href="/about"
					>
						About Us
					</a>
				</li>
				<li style={{ display: navStyle.displayItems }}>
					<a
						style={
							path.current === '/benefits'
								? { color: navStyle.color, textDecoration: navStyle.decoration }
								: {
										fontFamily: styleFont.current.fam,
										fontStyle: styleFont.current.s,
								  }
						}
						id="con"
						href="/benefits"
					>
						Our Benefits
					</a>
				</li>
				<li style={{ display: navStyle.displayItems }}>
					<a
						style={
							path.current.includes('tour')
								? { color: navStyle.color, textDecoration: navStyle.decoration }
								: {
										fontFamily: styleFont.current.fam,
										fontStyle: styleFont.current.s,
								  }
						}
						id="to"
						href="/tours"
					>
						Tours
					</a>
				</li>

				<li style={{ display: navStyle.displayItems }}>
					<a
						style={
							path.current === '/signup'
								? { color: navStyle.color, textDecoration: navStyle.decoration }
								: {
										fontFamily: styleFont.current.fam,
										fontStyle: styleFont.current.s,
								  }
						}
						id="crr"
						href="/signup"
					>
						Sign Up
					</a>
				</li>
				<li style={{ display: navStyle.displayItems }}>
					<a
						style={
							path.current === '/login'
								? { color: navStyle.color, textDecoration: navStyle.decoration }
								: {
										fontFamily: styleFont.current.fam,
										fontStyle: styleFont.current.s,
								  }
						}
						id="lgl"
						href="/login"
					>
						Login
					</a>
				</li>
				<li>
					<a
						onMouseLeave={onHoverNav}
						onMouseEnter={onHoverNav}
						style={
							auth.isLoggedIn
								? {
										display: '',
										fontFamily: styleFont.current.fam,
										fontStyle: styleFont.current.s,
										color: navStyle.color,
								  }
								: { display: 'none' }
						}
						href="/"
					>
						Log Out
					</a>
				</li>
			</ul>
		</div>
	);
}

export default Nav;
