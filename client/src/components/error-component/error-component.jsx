import React, { useContext, useEffect } from 'react';
import { MyContext } from '../../utils/functions/context';
import './error-component-styles.scss';
function ErrorComponent(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { auth, hide, msg, setMsg } = state;
	// useEffect hook for rendering error messages
	useEffect(() => {
		if (auth.expired === true)
			setMsg('Login session expired, please log in again.');
		else if (auth.expired) setMsg(auth.expired);
		else if (props.msg) setMsg(props.msg);
	}, [auth.expired, setMsg, props.msg]);
	// Render component
	return (
		<>
			<h3 className={props.msg ? 'load' : 'err'} style={{ display: hide.err }}>
				{msg}
			</h3>
		</>
	);
}

export default ErrorComponent;
