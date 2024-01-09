import React, { useContext, useEffect, useRef } from "react";
import "./tour-prev-component-styles.scss";
import Button from "../button-component/button-component";
import axios from "axios";
import { MyContext } from "../../utils/functions/context";
import { Link } from "react-router-dom";
import ErrorComponent from "../error-component/error-component";
import { useInView } from "react-intersection-observer";
import { getTour } from "../../utils/functions/functions";

function TourPrev() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const {
		tours,
		setTours,
		setHide,
		setMainRefs,
		hide,
		mainRefs,
		setPath,
		controller,
	} = state;
	// reference variable for retrieving data
	const gotData = useRef(null);

	// threshold percentage for useInView hook
	const threshold = useRef([0.86, 0.06]);

	// useInView hook for obsercing component
	const [ref, inView] = useInView({
		threshold: threshold.current,
	});
	// useEffect hook for retrieving tour data and observing component
	useEffect(() => {
		// Chechking to see if component in user view
		if (inView && !mainRefs.tour) {
			// set component to true
			setMainRefs((r) => {
				return {
					...r,
					tour: inView,
				};
			});
		}
		// set component to false
		else if (!inView && mainRefs.tour)
			setMainRefs((r) => {
				return {
					...r,
					tour: inView,
				};
			});
		// checks to see if tour data has been retrieved
		if (!gotData.current) {
			// retrieved
			gotData.current = true;

			// get request
			getTour(axios, gotData.current)
				.then((response) => {
					// set tour info
					setTours(response.Tours);
					// hide any err messages
					setHide((h) => {
						return {
							...h,
							err: "none",
						};
					});
				})
				.catch((err) => {
					// display err message
					setHide((h) => {
						return {
							...h,
							loader: "none",
							err: "",
						};
					});
				});
		}
	}, [setTours, setHide, inView, setMainRefs, mainRefs.tour, controller]);
	// Render component
	return (
		<section
			className="container tour-prev flex flex-col"
			id="tour-prev"
			ref={ref}
		>
			<div
				style={hide.err === "" ? { display: "none" } : { display: "" }}
				className="tour-prev title"
			>
				<h2>Most popular tours</h2>
			</div>

			<div className="tour-prev-content flex">
				{tours
					? tours.map((tour, index) => {
							if (
								(index === 0 && tour.difficulty === "easy") ||
								(index === 1 && tour.difficulty === "medium") ||
								(index === 3 && tour.difficulty === "difficult")
							) {
								return (
									<Link
										onClick={() => setPath(`/tours/${tour.slug}`)}
										className="tour-prev-content-cards"
										to={`/tours/${tour.slug}`}
										state={tour}
										key={`${tour.name} ${index}`}
									>
										<div
											key={`${tour.name}-${index}`}
											className="tour-prev-content-cards flex flex-col"
										>
											<div
												className="img-holder"
												id={
													tour.difficulty === "easy"
														? "one"
														: tour.difficulty === "medium"
														? "two"
														: "three"
												}
											>
												<img
													src={require(`../../imgs/tours/${tour.imageCover}`)}
													alt="tour-cover"
												/>
												<h2>{tour.name}</h2>
											</div>
											<ul>
												<li>{tour.duration} day tour</li>
												<li>Up to {tour.maxGroupSize} people</li>
												<li>{tour.guides.length} tour guides</li>
												<li>All accomodations included</li>
												<li>
													Difficulty:{" "}
													<span
														style={
															tour.difficulty === "easy"
																? { color: "#00916e" }
																: tour.difficulty === "medium"
																? { color: "#ee6123" }
																: { color: "#db0000" }
														}
													>
														{" "}
														{tour.difficulty}
													</span>
												</li>
											</ul>
										</div>
									</Link>
								);
							} else return "";
					  })
					: ""}
			</div>
			<ErrorComponent msg={"OOOPS! TOUR ERROR!"} />
			<Button msg={"More Tours"} class={"info"} id={"tours"} />
		</section>
	);
}

export default TourPrev;
