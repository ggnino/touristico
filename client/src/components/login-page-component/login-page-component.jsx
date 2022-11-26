import React, { useContext, useEffect } from 'react';
import { MyContext } from '../../utils/functions/context';
import UserForm from '../user-form-component/user-form-component';
import './login-page-component-styles.scss';

function LoginPage() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { navStyle, path, setPath, hide } = state;
	// useEffect hook for styling
	useEffect(() => {
		// if path does not match actual window path
		if (window.location.pathname !== path)
			// set login path
			setPath('/login');
	}, [navStyle, path, setPath, hide]);
	// Render component
	return (
		<>
			<h2 className="my-heading">Welcome back!</h2>
			<UserForm class={'login'} />
		</>
	);
}

export default LoginPage;
