import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MyContext } from '../../utils/functions/context';
import ErrorComponent from '../error-component/error-component';
import UserBookings from '../user-bookings-component/user-bookings-component';
import UserProfile from '../user-profile-component/user-profile-component';
import UserRewards from '../user-rewards-component/user-rewards-component';
import UserSettings from '../user-settings-component/user-settings-component';
import UserTours from '../user-tours-component/user-tours-component';
import Users from '../user-users-component/user-users-component';
import './user-page-component-styles.scss';

function UserPage() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const {
		userBorder,
		font,
		textColor,
		auth,
		setAuth,
		userMenu,
		setUserMenu,
		user,
		setUser,
		setSettings,
		setFont,
		hoverEffectUserPage,
		userMenuClicker,
		setPath,
		path,
		setHide,
		hide,
	} = state;
	const loc = useLocation();

	// useEffect hook for retrieving data and updating styling
	useEffect(() => {
		// If no user info or user info updated, retrieve user data
		if (loc.state && !user.name) {
			// set user info
			setUser((u) => {
				return {
					...u,
					name: loc.state.name,
					email: loc.state.email,
					photo: loc.state.photo,
					role: loc.state.role,
				};
			});
			// set user authentication
			setAuth((a) => {
				return {
					...a,
					jwt: loc.state.jwt,
					isLoggedIn: true,
					expired: false,
				};
			});
			// set user settings
			setSettings((s) => {
				return { ...s, ...loc.state.userSettings };
			});
			// if user settings font is not a default
			if (loc.state.userSettings.default !== true)
				// set user font
				setFont(loc.state.userSettings.default);
		}
		// on refresh authentication info lost but with valid state
		if (loc.state && !auth.isLoggedIn)
			// set authentication info
			setAuth((a) => {
				return { ...a, isLoggedIn: true, jwt: loc.state.jwt };
			});

		// Set user menu color
		setUserMenu((s) => {
			// add user color on edit profile
			if (s.menuItem !== 'none')
				return {
					...s,
					color: userBorder,
					color2: textColor,
					color3: textColor,
					color4: textColor,
					color5: textColor,
					color6: textColor,
				};
			// add user color on rewards
			if (s.menuItem2 !== 'none')
				return {
					...s,
					color: textColor,
					color2: userBorder,
					color3: textColor,
					color4: textColor,
					color5: textColor,
					color6: textColor,
				};
			// add user color on bookings
			if (s.menuItem3 !== 'none')
				return {
					...s,
					color: textColor,
					color2: textColor,
					color3: userBorder,
					color4: textColor,
					color5: textColor,
					color6: textColor,
				};
			// add user color on tours
			if (s.menuItem4 !== 'none')
				return {
					...s,
					color: textColor,
					color2: textColor,
					color3: textColor,
					color4: userBorder,
					color5: textColor,
					color6: textColor,
				};
			// add user color on users
			if (s.menuItem5 !== 'none')
				return {
					...s,
					color: textColor,
					color2: textColor,
					color3: textColor,
					color4: textColor,
					color5: userBorder,
					color6: textColor,
				};
			// add user color on settings
			if (s.menuItem6 !== 'none')
				return {
					...s,
					color: textColor,
					color2: textColor,
					color3: textColor,
					color4: textColor,
					color5: textColor,
					color6: userBorder,
				};
		});
		// valid state and err message showing
		if (loc.state && hide.err === '')
			// hide err message
			setHide((h) => {
				return {
					...h,
					err: 'none',
				};
			});

		// check if viewport width is 1106 px or less
		if (window.visualViewport.width <= 1106) {
			// set border bottom style
			setUserMenu((u) => {
				return { ...u, border: { borderBottom: `0.1rem solid ${userBorder}` } };
			});
		}
		// set border right style
		else
			setUserMenu((u) => {
				return { ...u, border: { borderRight: `0.1rem solid ${userBorder}` } };
			});
	}, [
		user,
		setUser,
		auth,
		textColor,
		setAuth,
		userBorder,
		setUserMenu,
		setFont,
		setSettings,
		loc,
		setPath,
		path,
		hide,
		setHide,
	]);

	// Render Component
	return (
		<>
			{auth.isLoggedIn ? (
				<>
					<h1
						style={{
							fontFamily: font,
							fontWeight: '900',
							fontStyle: 'italic',
							color: textColor,
						}}
					>
						Hi, {user.name}!
					</h1>
					<div className="home-content-user" onClick={userMenuClicker}>
						<ul style={userMenu.border}>
							<li>
								<span
									tabIndex={0}
									onMouseEnter={hoverEffectUserPage}
									onMouseLeave={hoverEffectUserPage}
									title="profile"
									style={
										font === 'bookmania'
											? {
													fontFamily: 'pill-gothic-900mg',
													fontStyle: 'oblique',
													color: userMenu.color,
											  }
											: font === 'aviano-future'
											? {
													fontFamily: 'ff-good-headline-web-pro-com',
													fontStyle: 'italic',
													color: userMenu.color,
											  }
											: { fontFamily: font, color: userMenu.color }
									}
								>
									Edit Profile
								</span>
							</li>
							<li>
								<span
									tabIndex={0}
									onMouseEnter={hoverEffectUserPage}
									onMouseLeave={hoverEffectUserPage}
									title="rewards"
									style={
										font === 'bookmania'
											? {
													fontFamily: 'pill-gothic-900mg',
													fontStyle: 'oblique',
													color: userMenu.color2,
											  }
											: font === 'aviano-future'
											? {
													fontFamily: 'ff-good-headline-web-pro-com',
													fontStyle: 'italic',
													color: userMenu.color2,
											  }
											: { fontFamily: font, color: userMenu.color2 }
									}
								>
									Rewards
								</span>
							</li>
							<li>
								<span
									tabIndex={0}
									onMouseEnter={hoverEffectUserPage}
									onMouseLeave={hoverEffectUserPage}
									title="bookings"
									style={
										font === 'bookmania'
											? {
													fontFamily: 'pill-gothic-900mg',
													fontStyle: 'oblique',
													color: userMenu.color3,
											  }
											: font === 'aviano-future'
											? {
													fontFamily: 'ff-good-headline-web-pro-com',
													fontStyle: 'italic',
													color: userMenu.color3,
											  }
											: { fontFamily: font, color: userMenu.color3 }
									}
								>
									Bookings
								</span>
							</li>
							<li
								style={
									user.role !== 'admin' ? { display: 'none' } : { display: '' }
								}
							>
								<span
									tabIndex={0}
									onMouseEnter={hoverEffectUserPage}
									onMouseLeave={hoverEffectUserPage}
									title="tours"
									style={
										font === 'bookmania'
											? {
													fontFamily: 'pill-gothic-900mg',
													fontStyle: 'oblique',
													color: userMenu.color4,
											  }
											: font === 'aviano-future'
											? {
													fontFamily: 'ff-good-headline-web-pro-com',
													fontStyle: 'italic',
													color: userMenu.color4,
											  }
											: {
													fontFamily: font,
													color: userMenu.color4,
											  }
									}
								>
									Tours
								</span>
							</li>
							<li
								style={
									user.role !== 'admin' ? { display: 'none' } : { display: '' }
								}
							>
								<span
									tabIndex={0}
									onMouseEnter={hoverEffectUserPage}
									onMouseLeave={hoverEffectUserPage}
									title="users"
									style={
										font === 'bookmania'
											? {
													fontFamily: 'pill-gothic-900mg',
													fontStyle: 'oblique',
													color: userMenu.color5,
											  }
											: font === 'aviano-future'
											? {
													fontFamily: 'ff-good-headline-web-pro-com',
													fontStyle: 'italic',
													color: userMenu.color5,
											  }
											: { fontFamily: font, color: userMenu.color5 }
									}
								>
									Users
								</span>
							</li>
							<li>
								<span
									tabIndex={0}
									onMouseEnter={hoverEffectUserPage}
									onMouseLeave={hoverEffectUserPage}
									title="settings"
									style={
										font === 'bookmania'
											? {
													fontFamily: 'pill-gothic-900mg',
													fontStyle: 'oblique',
													color: userMenu.color6,
											  }
											: font === 'aviano-future'
											? {
													fontFamily: 'ff-good-headline-web-pro-com',
													fontStyle: 'italic',
													color: userMenu.color6,
											  }
											: { fontFamily: font, color: userMenu.color6 }
									}
								>
									Settings
								</span>
							</li>
						</ul>
						<div className="home-content-user-info">
							<h2
								style={{
									fontFamily: font,
									display: userMenu.menuItem3,
									color: textColor,
								}}
							>
								My Bookings
							</h2>
							<UserProfile display={userMenu.menuItem} />
							<UserRewards display={userMenu.menuItem2} />
							<UserBookings display={userMenu.menuItem3} />
							<UserTours display={userMenu.menuItem4} />
							<Users display={userMenu.menuItem5} />
							<UserSettings display={userMenu.menuItem6} />
						</div>
					</div>
				</>
			) : (
				<ErrorComponent />
			)}
		</>
	);
}

export default UserPage;
