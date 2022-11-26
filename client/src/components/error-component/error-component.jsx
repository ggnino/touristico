import React, { useContext, useEffect } from 'react';
import { MyContext } from '../../utils/functions/context';
import './error-component-styles.scss';
function ErrorComponent(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { auth, hide, msg, setMsg, path } = state;

	// useEffect hook for rendering error messages
	useEffect(() => {
		// if user token expired
		if (auth.expired === true)
			// display expiration message
			setMsg('Login session expired, please log in again.');
		// if error message
		else if (auth.expired)
			// display error message
			setMsg(auth.expired);
		// if messeage in props
		else if (props.msg)
			// display props message
			setMsg(props.msg);
		// if not logged in with proper credentials
		else if (!auth.isLoggedIn && !auth.expired && path !== '/login')
			// display the following error message
			setMsg('NO AUTHORIZATION!!! PLEASE LOGIN!!!');
	}, [auth, setMsg, props.msg, path]);

	// Render component
	return (
		<h3
			className={props.msg ? 'load' : 'err'}
			style={
				path === '/home' && !auth.isLoggedIn
					? { display: hide.err, fontSize: '5rem' }
					: { display: hide.err }
			}
		>
			{msg}
		</h3>
	);
}

export default ErrorComponent;
