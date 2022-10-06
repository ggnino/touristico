import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MyContext } from '../../utils/functions/context';
import ErrorComponent from '../error-component/error-component';
import Loader from '../loader-component/loader-component';
import TourCard from '../tour-card-component/tour-card-component';
import './tours-page-component-styles.scss';

function ToursPage() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { tours, setTours, setHide } = state;
	// useLocation hook for location state
	const location = useLocation();
	// useEffect hook for retrieving tour data
	useEffect(() => {
		// no location state data, retrieve tour data
		if (!location.state) {
			axios
				.get('/api/v1/tours')
				.then((response) => {
					// hide loader img and any err messages
					setHide((h) => {
						return {
							...h,
							loader: 'none',
							err: 'none',
						};
					});
					// set tour data
					setTours(response.data.Tours);
				})
				.catch((err) => {
					// Hide loader img and show err msg
					setHide((h) => {
						return {
							...h,
							loader: 'none',
							err: '',
						};
					});
				});
		}
	}, [location.state, setHide, setTours]);
	// Render component
	return (
		<>
			<h1 className="my-heading">Tours</h1>
			<div className="tours-content-cards">
				<Loader />
				{tours.length > 0 ? (
					tours.map((tour, index) => (
						<TourCard key={`${tour.name} ${index}`} info={tour} />
					))
				) : (
					<ErrorComponent msg={'OOPS! AN ERROR!'} />
				)}
			</div>
		</>
	);
}

export default ToursPage;
