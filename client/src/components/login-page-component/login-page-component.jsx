import React, { useContext, useEffect } from 'react';
import { MyContext } from '../../utils/functions/context';
import UserForm from '../user-form-component/user-form-component';
import './login-page-component-styles.scss';
import styleVars from '../../utils/styles/variables.scss';

function LoginPage() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { navStyle } = state;
	// useEffect hook for styling
	useEffect(() => {
		// reload page if navbar not correct
		if (navStyle.borderBottom.includes(styleVars.color4)) {
			window.location.reload();
		}
	}, [navStyle]);
	// Render component
	return (
		<>
			<h1 className="my-heading">Welcome back!</h1>
			<UserForm class={'login'} />
		</>
	);
}

export default LoginPage;
