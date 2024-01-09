import React, { useContext, useEffect, useRef } from "react";
import { MyContext } from "../../utils/functions/context";
import "./button-component-styles.scss";

function Button(props) {
	// useContext hook for app state
	const state = useContext(MyContext);

	// Destructuring state
	const { font, clicker, settings, btnStyle, setBtnStyle, path, theUpdater } =
		state;

	// reference variable for btn class light
	const light = useRef("");

	// useEffect hook for btn styling
	useEffect(() => {
		// if theres icon to display
		if (props.icon) {
			// display button icon
			setBtnStyle({ display: "" });
		}
		// hide button icon
		else setBtnStyle({ display: "none" });
		// if light theme selected
		if (settings.light) {
			// display light theme button class
			light.current = "btn-light";
		}
		// no button light theme class
		else light.current = "";
		// not userpage remove any light theme
		if (path !== "/home") light.current = "";
	}, [path, props.icon, props.tour, setBtnStyle, settings.light]);

	// Render component
	return (
		<>
			{props.id === "welcome" ? (
				<a
					className={`btn ${light.current} ${props.class}`}
					href="#tour-prev"
					id={props.id}
					title={props.msg}
					tabIndex={0}
				>
					{props.msg}
				</a>
			) : (
				<button
					onClick={
						props.id === "user-profile"
							? theUpdater
							: props.tour
							? (e) => clicker(e, props.tour)
							: clicker
					}
					onMouseEnter={props.hover}
					onMouseLeave={props.hover}
					className={`btn ${light.current} ${props.class}`}
					title={props.msg === "Book Now" ? "#DemoOnly" : `${props.msg} Button`}
					id={props.id}
					style={
						font === "bookmania"
							? { fontFamily: font, paddingBottom: 0, alignItems: "baseline" }
							: { fontFamily: font }
					}
					type="button"
					tabIndex={0}
				>
					<img
						title={`${props.msg}-btn-img`}
						style={
							font === "bookmania"
								? {
										display: btnStyle.display,
										top: "0.5rem",
								  }
								: { display: btnStyle.display }
						}
						src={props.icon ? props.icon : null}
						alt={`${props.msg}-button`}
					/>
					{props.msg}
				</button>
			)}
		</>
	);
}

export default Button;
