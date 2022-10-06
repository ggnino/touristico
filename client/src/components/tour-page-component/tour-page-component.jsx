import React, { useRef, useEffect, useContext } from 'react';
import UserIcon from '../user-icon-component/user-icon-component';
import './tour-page-component-styles.scss';
import Button from '../button-component/button-component';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Modal from '../modal-component/modal-component';
import { MyContext } from '../../utils/functions/context';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../loader-component/loader-component';
import ErrorComponent from '../error-component/error-component';
import { getTour } from '../../utils/functions/functions';

function TourPage() {
	// mapbox access token
	mapboxgl.accessToken =
		'pk.eyJ1IjoiZ2duaW5vMTgiLCJhIjoiY2wyZGxzdjVqMHpqajNpcGFvdXJxdjhvNyJ9.TWeSXJu46lI5saYTHVFAtg';
	// uselocation hook
	const location = useLocation();
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const {
		clicker,
		setTours,
		setHide,
		mapBoxSettings,
		isMountedTourPage,
		setIsMountedTourPage,
		myTour,
		setMyTour,
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
		const controller = new AbortController();
		if (location.state) setMyTour(location.state);
		// component mounted
		if (isMountedTourPage) {
			let tourLocations = null;
			// mapbox not set up yet
			if (!map.current) {
				(async () => {
					try {
						let theTour = null;
						// no tour info, retrieve tour info
						if (!myTour) {
							// show loader component
							setHide((h) => {
								return {
									...h,
									loader: '',
								};
							});
							// get tour data
							theTour = await getTour(controller, axios);
							// set tour info
							setMyTour(theTour);
							// hide loader component
							setHide((h) => {
								return {
									...h,
									loader: 'none',
								};
							});
							// arr for tour locations
							tourLocations = theTour.locations.map((l) => l);
						} else tourLocations = myTour.locations.map((l) => l);
						// tour data is ready but not mapbox
						if (theTour && !map.current) {
							// set latitude coordinates for tour locations
							setLat(theTour.startLocation.coordinates[1]);
							// set longitude coordinates for tour locations
							setLng(theTour.startLocation.coordinates[0]);
							// set tour images
							setBg((bg) => {
								return {
									img: theTour.imageCover,
									img2: theTour.images[0],
									img3: theTour.images[1],
									img4: theTour.images[2],
								};
							});
						}
						// set up mapbox
						map.current = new mapboxgl.Map({
							container: mapContainer.current,
							style: 'mapbox://styles/ggnino18/cl2dqvhrj001014pg6sdcjqk0',
							center: [lng, lat],
							scrollZoom: false,
							zoom,
						});
						// map bounds
						bounds.current = new mapboxgl.LngLatBounds();
						// set tour marker for each tour location
						tourLocations.forEach((loc, index) => {
							// Add marker
							const el = document.createElement('div');
							el.className = 'marker';
							new mapboxgl.Marker({
								element: el,
								anchor: 'bottom',
							})
								.setLngLat(loc.coordinates)
								.addTo(map.current);

							new mapboxgl.Popup({
								offset: 30,
							})
								.setLngLat(loc.coordinates)
								.setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
								.addTo(map.current);
							// Extends map bounds to include start location
							bounds.current.extend(loc.coordinates);
						});
						// set map bounds
						map.current.fitBounds(bounds.current);
						// mapbox map is size correctly on load
						map.current.on('load', () => {
							map.current.resize();
						});
						// scroll behavior while scrolling into view
						element.current.scrollIntoView({ behavior: 'smooth' });
					} catch (err) {
						setHide((h) => {
							return {
								...h,
								loader: 'none',
								err: '',
							};
						});
						console.log(err);
					}
				})();
			}
		}
		// cancel any requests on component unmount
		return () => {
			const controller = new AbortController();
			controller.abort();
			setIsMountedTourPage(false);
		};
	}, [
		setIsMountedTourPage,
		setMyTour,
		location.state,
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
		isMountedTourPage,
		setHide,
	]);

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
										backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(255, 207, 0, 0.8)), url(${`../../imgs/tours/${myTour.imageCover}`})`,
								  }
								: {}
						}
						id="top"
					>
						<h1>{myTour ? myTour.name : 'Tour Name'}</h1>
					</div>

					<div className="tour-content-info">
						<div className="tour-content-info-facts">
							<h3>Tour Information</h3>
							<ul>
								<li>
									Start Date:
									<span>
										{myTour
											? new Date(myTour.startDates[0]).toDateString() + ', '
											: 'No Dates'}
									</span>
								</li>
								<li>
									Difficulty:{' '}
									<span>{myTour ? myTour.difficulty : 'Tour Difficulty'}</span>
								</li>
								<li>
									Participants:
									<span>
										{' '}
										{myTour ? myTour.maxGroupSize : 'Tour Group Size'}
									</span>
								</li>
								<li>
									Ratings
									{myTour ? ` (${myTour.ratingsQuantity}) ` : 'None'}:
									<span title="#openModal" onClick={clicker}>
										{myTour ? myTour.ratingsAverage : 'Ratings'}
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
													id={'guides'}
												/>
											);
									  })
									: 'No Tours'}
							</div>
						</div>
						<div className="tour-content-info-description">
							<h3>About The Tour</h3>
							<p>{myTour ? myTour.description : 'Tour Description'}</p>
						</div>
					</div>
					<Button msg={'Book Now'} class={'home text-gradient'} />
					<div className="tour-content-imgs">
						{myTour
							? myTour.images.map((img, index) => (
									<img
										key={`Image:${index + 45}`}
										src={'/imgs/tours/' + img}
										alt="tour preview"
									/>
							  ))
							: 'No Tour Images'}
					</div>

					<div ref={mapContainer} className="map-container"></div>
					<Modal class={'modal'} id={myTour ? myTour._id : 'ID'} />
				</>
			) : (
				<>
					<Loader />
					<ErrorComponent msg={'OOPS ERROR!!!!!!!!'} />
				</>
			)}
		</>
	);
}

export default TourPage;
