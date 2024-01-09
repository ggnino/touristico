import React, { useContext } from "react";
import UserForm from "../user-form-component/user-form-component";
import "./modal-styles.scss";

import TourReview from "../tour-review-component/tour-review-component";
import { MyContext } from "../../utils/functions/context";

function Modal(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { clicker, modalDis, onHoverModal, img } = state;

	// Render component
	return (
		<div className="container modal" style={modalDis}>
			<UserForm
				class={"modal"}
				display={window.location.pathname === "/home" ? "" : "none"}
			/>
			<TourReview
				display={window.location.pathname === "/home" ? "none" : ""}
				id={props.id}
			/>
			<div
				className="close-wrapper"
				onMouseEnter={onHoverModal}
				onMouseLeave={onHoverModal}
				onClick={clicker}
				onTouchStart={clicker}
			>
				<img
					title="close"
					id="close"
					className="close"
					src={img.img}
					alt="close-button"
				/>
			</div>
		</div>
	);
}

export default Modal;
