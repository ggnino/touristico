import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MyContext } from '../../utils/functions/context';
import UserForm from '../user-form-component/user-form-component';
import './signup-component-styles.scss';

function Signup() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { input, setInput, navStyle } = state;
	// useLocation hook
	const location = useLocation();
	// useEffect hook for setting input
	useEffect(() => {
		// if user redirected from the book now component
		if (location.state) {
			const { name, email } = location.state;
			// if input is not filled the user info
			if (input.name !== name) {
				// set user info
				setInput((i) => {
					return {
						...i,
						name,
						email,
					};
				});
			}
			// reload page if nevbar bodercolor not correct
			else if (
				input.name === name &&
				navStyle.borderBottom.includes('#db0000')
			) {
				window.location.reload();
			}
		}
	}, [setInput, input, navStyle, location]);
	// Render component
	return (
		<>
			<h1 className="my-heading">Hi, new user!</h1>
			<UserForm class={'signup'} />
		</>
	);
}

export default Signup;
