import React, { useContext, useEffect, useRef } from "react";
import "./header-component-styles.scss";
import img1 from "../../imgs/edge2.mp4";
import Button from "../button-component/button-component";
import { MyContext } from "../../utils/functions/context";
import { useInView } from "react-intersection-observer";
function HeaderComponent() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { setMainRefs } = state;
	const threshold = useRef(1);
	// Adjust threshold by viewport
	if (window.visualViewport.height > 1400) {
		// threshold.current = 0.2;
	}
	// useInView hook for observing component
	const [ref, inView] = useInView({
		threshold: threshold.current,
	});
	// useEffect hook for observing component
	useEffect(() => {
		// Chechking to see if component in user view
		if (inView)
			setMainRefs((r) => {
				return {
					...r,
					head: inView,
				};
			});
		else
			setMainRefs((r) => {
				return {
					...r,
					head: inView,
				};
			});
	}, [inView, setMainRefs]);
	// Render component
	return (
		<header role={"banner"} className="container header" ref={ref}>
			<div className="bg-video">
				<video src={img1 || ""} autoPlay muted loop></video>
			</div>
			<h1 className="header-greeting text-gradient">Welcome</h1>

			<h2>Your next adventure awaits!</h2>

			<Button
				msg={"Discover our tours"}
				class={"home text-gradient"}
				link={"#tour-prev"}
			/>
		</header>
	);
}
export default HeaderComponent;
