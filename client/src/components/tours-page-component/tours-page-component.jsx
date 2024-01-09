import axios from "axios";
import React, { useContext, useEffect } from "react";
import { MyContext } from "../../utils/functions/context";
import ErrorComponent from "../error-component/error-component";
import Loader from "../loader-component/loader-component";
import TourCard from "../tour-card-component/tour-card-component";
import "./tours-page-component-styles.scss";
import { getTour } from "../../utils/functions/functions";

function ToursPage() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { tours, setTours, setHide, loc, path, setPath } = state;
	// useLocation hook for location state

	// useEffect hook for retrieving tour data
	useEffect(() => {
		if (window.location.pathname !== path) setPath(window.location.pathname);
		// no location state data, retrieve tour data
		if (!loc.state) {
			getTour(axios, true)
				.then((response) => {
					// hide loader img and any err messages
					setHide((h) => {
						return {
							...h,
							loader: "none",
							err: "none",
						};
					});
					// set tour data
					setTours(response.Tours);
					console.log("GOT TOURS!!!!!!!!!!!");
				})
				.catch((err) => {
					// Hide loader img and show err msg
					setHide((h) => {
						return {
							...h,
							loader: "none",
							err: "",
						};
					});
				});
		}
	}, [loc.state, setHide, setTours, setPath, path]);
	// Render component
	return (
		<>
			<h1 className="my-heading">Tours</h1>
			<div className="tours-content-cards flex">
				<Loader />
				{tours.length > 0 ? (
					tours.map((tour, index) => (
						<TourCard key={`${tour.name} ${index}`} info={tour} />
					))
				) : (
					<ErrorComponent msg={"OOPS! AN ERROR!"} />
				)}
			</div>
		</>
	);
}

export default ToursPage;
