import React, { useContext, useEffect, useRef } from 'react';
import { MyContext } from '../../utils/functions/context';
import './button-component-styles.scss';
import { HashLink } from 'react-router-hash-link';

function Button(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const {
		font,
		clicker,
		settings,
		userMenu,
		hide,
		input,
		btnStyle,
		setBtnStyle,
		path,
	} = state;

	// reference variable for btn class light
	const light = useRef('');
	// useEffect hook for btn styling
	useEffect(() => {
		// if theres icon to display
		if (props.icon) {
			// display button icon
			setBtnStyle({ display: '' });
		}
		// hide button icon
		else setBtnStyle({ display: 'none' });
		// if light theme selected
		if (settings.light) {
			// display light theme button class
			light.current = 'btn-light';
		}
		// no button light theme class
		else light.current = '';
		// not userpage remove any light theme
		if (path !== '/home') light.current = '';
	}, [path, props.icon, setBtnStyle, settings.light, props.msg]);

	// Render component
	return (
		<div
			onClick={
				window.location.pathname === '/benefits' ||
				window.location.pathname === '/login' ||
				window.location.pathname === '/signup' ||
				window.location.pathname === '/home' ||
				window.location.pathname === '/'
					? clicker
					: () => {}
			}
			tabIndex="0"
			title="button-container"
		>
			{(userMenu.menuItem4 !== 'none' && props.msg !== 'Save') ||
			props.link === 'user-profile' ||
			props.msg === 'Book Now' ||
			props.msg === 'Redee' ? (
				<button
					onMouseEnter={props.hover}
					onMouseLeave={props.hover}
					className={`btn ${light.current} ${props.class}`}
					title={props.msg === 'Book Now' ? '#DemoOnly' : props.link}
					id={light.current}
					style={
						font === 'bookmania'
							? { fontFamily: font, paddingBottom: 0, alignItems: 'baseline' }
							: { fontFamily: font }
					}
					type="button"
					tabIndex={0}
				>
					<img
						title={props.link}
						style={
							font === 'bookmania'
								? {
										display: btnStyle.display,
										top: '0.5rem',
								  }
								: { display: btnStyle.display }
						}
						src={props.icon ? props.icon : ''}
						alt="add-button"
					/>
					{props.msg}
				</button>
			) : (
				<HashLink
					onClick={
						props.msg === 'Continue' || props.msg === 'Redeem'
							? clicker
							: () => {}
					}
					to={props.link === 'settings' ? '' : props.link}
					state={path.includes('/tours') ? props.tour : null}
					onMouseEnter={props.hover}
					onMouseLeave={props.hover}
					className={`btn ${light.current} ${props.class}`}
					title={props.msg === 'Continue' ? 'book' : props.link}
					id={light.current}
					style={
						hide.err !== 'none' && props.link === 'tours'
							? { display: 'none' }
							: font === 'bookmania'
							? { fontFamily: font, paddingBottom: 0, alignItems: 'baseline' }
							: props.msg === 'Continue' &&
							  ((input.email === '' && input.name !== '') ||
									(input.email.search(
										/* eslint-disable */
										/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
									) &&
										input.name !== '') ||
									(input.email === '' && input.name === '') ||
									(input.email !== '' && input.name === ''))
							? { visibility: 'hidden', opacity: 0 }
							: props.msg === 'Redeem'
							? { cursor: 'default' }
							: { fontFamily: font }
					}
					tabIndex={0}
				>
					<img
						title={props.link}
						style={
							font === 'bookmania'
								? {
										display: btnStyle.display,
										top: '0.5rem',
								  }
								: { display: btnStyle.display }
						}
						src={props.icon ? props.icon : ''}
						alt="add-button"
					/>
					{props.msg || 'Discover our tours'}
				</HashLink>
			)}
		</div>
	);
}

export default Button;
