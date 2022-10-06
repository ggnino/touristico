import React, { useContext } from 'react';
import { MyContext } from '../../utils/functions/context';
import UserForm from '../user-form-component/user-form-component';
import './user-settings-styles.scss';

function UserSettings(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { font, textColor } = state;
	// Render component
	return (
		<>
			<h2
				style={{ fontFamily: font, display: props.display, color: textColor }}
			>
				Settings
			</h2>
			<UserForm class={'settings'} display={props.display} />
		</>
	);
}

export default UserSettings;
