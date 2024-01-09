import React, { useRef, useEffect, useContext } from "react";
import UserIcon from "../user-icon-component/user-icon-component";
import "./tour-page-component-styles.scss";
import Button from "../button-component/button-component";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Modal from "../modal-component/modal-component";
import { MyContext } from "../../utils/functions/context";
import axios from "axios";
import Loader from "../loader-component/loader-component";
import ErrorComponent from "../error-component/error-component";
import { getTour } from "../../utils/functions/functions";

function TourPage() {
	// mapbox access token
	mapboxgl.accessToken =
		"pk.eyJ1IjoiZ2duaW5vMTgiLCJhIjoiY2wyZGxzdjVqMHpqajNpcGFvdXJxdjhvNyJ9.TWeSXJu46lI5saYTHVFAtg";
	// uselocation hook
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const {
		clicker,
		setTours,
		setHide,
		mapBoxSettings,
		myTour,
		setMyTour,
		path,
		loc,
	} = state;
	// Destructuring mapbox settings
	const { bg, setBg, lat, setLat, lng, setLng, zoom, locations } =
		mapBoxSettings;
	// reference variables
	const element = useRef(null); // scroll into element
	const mapContainer = useRef(null); // mapbox container
	const map = useRef(null); // actual map
	const bounds = useRef(null); // mapbox bounds

	// useEffect hook for retrieving tour data
	useEffect(() => {
		let tourLocations = null; // for tour locations

		// if location.state is valid
		if (loc.state && loc.state.slug) {
			// set tour page info
			setMyTour(loc.state);
			tourLocations = loc.state.locations.map((l) => l);
		} else if (!loc.state) {
			getTour(axios)
				.then((tour) => {
					// show loader component
					setHide((h) => {
						return {
							...h,
							loader: "",
						};
					});

					// set tour info
					loc.state = tour;
					setMyTour(tour);
					// hide loader component
					setHide((h) => {
						return {
							...h,
							loader: "none",
						};
					});

					// arr for tour locations
					tourLocations = tour.locations.map((l) => l);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		if (!mapContainer.current || !element.current) return;
		if (!map.current) {
			// tour data is ready but not mapbox
			if (myTour && !map.current) {
				console.log("in herer wow", myTour);
				// set latitude coordinates for tour locations
				setLat(myTour.startLocation.coordinates[1]);
				// set longitude coordinates for tour locations
				setLng(myTour.startLocation.coordinates[0]);
				// set tour images
				setBg((bg) => {
					return {
						img: myTour.imageCover,
						img2: myTour.images[0],
						img3: myTour.images[1],
						img4: myTour.images[2],
					};
				});
			}
			// set up mapbox
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: "mapbox://styles/ggnino18/cl2dqvhrj001014pg6sdcjqk0",
				center: [lng, lat],
				scrollZoom: false,
				zoom,
				willReadFrequently: true,
			});
			// map bounds
			bounds.current = new mapboxgl.LngLatBounds();
			// set tour marker for each tour location
			tourLocations.forEach((location, index) => {
				// Add marker
				const el = document.createElement("div");
				el.className = "marker";
				new mapboxgl.Marker({
					element: el,
					anchor: "bottom",
				})
					.setLngLat(location.coordinates)
					.addTo(map.current);

				new mapboxgl.Popup({
					offset: 30,
				})
					.setLngLat(location.coordinates)
					.setHTML(`<em>Day ${location.day}: ${location.description}</em>`)
					.addTo(map.current);
				// Extends map bounds to include start location
				bounds.current.extend(location.coordinates);
			});
			// set map bounds
			map.current.fitBounds(bounds.current);
			// mapbox map is size correctly on load
			map.current.on("load", () => {
				map.current.resize();
			});
		}
		// scroll behavior while scrolling into view
		element.current.scrollIntoView({ behavior: "smooth" });
	}, [
		setMyTour,
		loc,
		bg,
		lat,
		lng,
		zoom,
		locations,
		setBg,
		setLat,
		setLng,
		setTours,
		myTour,
		setHide,
		path,
	]);
	// render component
	return (
		<>
			{myTour ? (
				<>
					<div
						ref={element}
						className="tour-content-title"
						style={
							myTour
								? {
										backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(255, 207, 0, 0.8)), url(${require(`../../imgs/tours/${myTour.imageCover}`)})`,
								  }
								: null
						}
					>
						<h1>{myTour ? myTour.name : "Tour Name"}</h1>
					</div>

					<div className="tour-content-info">
						<div className="tour-content-info-facts">
							<h3>Tour Information</h3>
							<ul>
								<li>
									Start Date:
									<span>
										{myTour
											? new Date(myTour.startDates[0]).toDateString() + ", "
											: "No Dates"}
									</span>
								</li>
								<li>
									Difficulty:{" "}
									<span>{myTour ? myTour.difficulty : "Tour Difficulty"}</span>
								</li>
								<li>
									Participants:
									<span>
										{" "}
										{myTour ? myTour.maxGroupSize : "Tour Group Size"}
									</span>
								</li>
								<li>
									Ratings
									{myTour ? `(${myTour.ratingsQuantity})` : "None"}:
									<span id="#openModal" onClick={clicker}>
										{myTour ? myTour.ratingsAverage : "Ratings"}
										<em title="#openModal">/</em>5
									</span>
								</li>
							</ul>
							<h3>Tour Guides</h3>
							<div className="tour-content-info-guides">
								{myTour
									? myTour.guides.map((guide, index) => {
											return (
												<UserIcon
													key={`Guide:${index}`}
													img={guide.photo}
													name={guide.name}
													id={"guides"}
												/>
											);
									  })
									: "No Tours"}
							</div>
						</div>
						<div className="tour-content-info-description">
							<h3>About The Tour</h3>
							<p>{myTour ? myTour.description : "Tour Description"}</p>
						</div>
					</div>
					<Button msg={"Book Now"} class={"home text-gradient"} />
					<div className="tour-content-imgs">
						{myTour
							? myTour.images.map((img, index) => (
									<img
										key={`Image:${index + 45}`}
										src={require("../../imgs/tours/" + img)}
										alt="tour preview"
									/>
							  ))
							: "No Tour Images"}
					</div>

					<div ref={mapContainer} className="map-container"></div>
					<Modal class={"modal"} id={myTour ? myTour._id : "ID"} />
				</>
			) : (
				<>
					<Loader />
					<ErrorComponent msg={"OOPS ERROR!!!!!!!!"} />
				</>
			)}
		</>
	);
}

export default TourPage;
