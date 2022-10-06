import React, { useContext } from 'react';
import './user-tours-styles.scss';
import Button from '../button-component/button-component';
import Modal from '../modal-component/modal-component';
import List from '../user-list-component/user-list-component';
import { MyContext } from '../../utils/functions/context';

function UserTours(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { clicker, modalDis, font, textColor, btnImage, onHoverBtnImg } = state;
	// Render component
	return (
		<>
			<div
				className="userTours-heading"
				onClick={clicker}
				style={{ display: props.display }}
			>
				<h2 style={{ fontFamily: font, color: textColor }}>Tours</h2>
				<Button
					class={'userTours-heading-add'}
					icon={btnImage.img}
					link={'#openModal'}
					msg={'Add Tours'}
					hover={onHoverBtnImg}
				/>
			</div>
			<List display={props.display} title={'Tour'} />
			<Modal clicker={clicker} display={modalDis.display} />
		</>
	);
}

export default UserTours;
