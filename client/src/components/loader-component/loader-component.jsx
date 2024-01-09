import React, { useContext } from "react";
import { MyContext } from "../../utils/functions/context";

function Loader() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { hide } = state;
	// Render component
	return (
		<div
			className="load ld ld-ring ld-cycle"
			style={{ display: hide.loader }}
		></div>
	);
}

export default Loader;
