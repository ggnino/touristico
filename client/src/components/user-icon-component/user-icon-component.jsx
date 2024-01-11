import React, { useContext } from "react";
import "./user-icon-component-styles.scss";
import { MyContext } from "../../utils/functions/context";

function UserIcon(props) {
	const state = useContext(MyContext);
	const { path } = state;

	// Render component
	return (
		<div
			className={props.id === "guides" ? "user-icon" : "user-icon no-hover"}
			tabIndex={0}
			key={props.k ? props.k + props.id : props.id}
			style={props.display ? { display: props.display } : { display: "" }}
		>
			<img
				src={
					path === "/home" && !props.img.includes("default")
						? `/imgs/users/${props.img}`
						: props.id === "default"
						? props.img
						: require(`/src/imgs/users/${props.img}`)
				}
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
