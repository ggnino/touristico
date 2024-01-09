import React, { useContext, useEffect } from "react";
import { MyContext } from "../../utils/functions/context";
import UserForm from "../user-form-component/user-form-component";
import "./signup-component-styles.scss";

function Signup() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { input, setInput, loc } = state;

	// useEffect hook for setting input
	useEffect(() => {
		// if user redirected from the book now component
		if (loc.state) {
			const { name, email } = loc.state;
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
		}
	}, [setInput, input, loc]);
	// Render component
	return (
		<>
			<h2 className="my-heading">Hi, new user!</h2>
			<UserForm class={"signup"} />
		</>
	);
}

export default Signup;
