import React, { useContext } from 'react';
import { MyContext } from '../../utils/functions/context';
import UserForm from '../user-form-component/user-form-component';
import UserIcon from '../user-icon-component/user-icon-component';
import './user-profile-component-styles.scss';

function UserProfile(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { font, textColor, user } = state;

	// Render component
	return (
		<>
			<h2
				style={{ display: props.display, fontFamily: font, color: textColor }}
				className="user-form my-heading"
			>
				My Profile
			</h2>

			<UserIcon img={user.photo} display={props.display} />
			<UserForm display={props.display} class={'user-profile'} />
		</>
	);
}

export default UserProfile;
