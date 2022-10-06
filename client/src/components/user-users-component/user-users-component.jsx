import React, { useContext } from 'react';
import { MyContext } from '../../utils/functions/context';
import List from '../user-list-component/user-list-component';
import './user-users-component-style.scss';

function Users(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { font, textColor } = state;
	// render component
	return (
		<>
			<h2
				style={{ fontFamily: font, display: props.display, color: textColor }}
				className="users my-heading"
			>
				Active Users
			</h2>
			<List display={props.display} title={'User'} />
			<h2
				style={{ fontFamily: font, display: props.display, color: textColor }}
				className="users my-heading"
			>
				Inactive Users
			</h2>
			<List display={props.display} title={'User'} />
		</>
	);
}

export default Users;
