import React from "react";

import "./user-icon-component-styles.scss";

function UserIcon(props) {
	// Render component
	return (
		<div
			className={props.id === "guides" ? "user-icon" : "user-icon no-hover"}
			tabIndex={0}
			key={props.k ? props.k + props.id : props.id}
			style={props.display ? { display: props.display } : { display: "" }}
		>
			<img
				src={require(`/src/imgs/users/${props.img}`)}
				alt={props.id === "guides" ? "tour-guide" : "user"}
				id={props.id}
				tabIndex={0}
			/>
			<p
				tabIndex={0}
				style={props.id === "guides" ? { display: "" } : { display: "none" }}
			>
				{props.name}
			</p>
		</div>
	);
}

export default UserIcon;
