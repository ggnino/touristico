import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { MyContext } from '../../utils/functions/context';
import Review from '../review-component/review-component';
import './tour-review-component-styles.scss';

function TourReview(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { setHide, reviews, SetReviews, path } = state;
	// useEffect hook for retrieving review data
	useEffect(() => {
		// check to see if component mo
		if (path.includes('/tours/') && props.id !== 'ID')
			// get tour reviews request
			axios
				.get(`/api/v1/tours/id/${props.id}/reviews`, {
					signal: new AbortController().signal,
				})
				.then((res) => {
					// hide load component and any err messages
					setHide((h) => {
						return {
							...h,
							loader: 'none',
							err: 'none',
						};
					});
					// tour review data
					SetReviews(res.data);
				})
				.catch((err) => {
					// display err message
					setHide((h) => {
						return {
							...h,
							loader: 'none',
							err: '',
						};
					});
				});
		//  on component unmount
		return () => {
			// variable for abort controller
			const controller = new AbortController();
			// cancel any pending requests
			controller.abort();
		};
	}, [props.id, SetReviews, path, setHide]);
	// Render component
	return (
		<div className="tourReview" style={{ display: props.display }}>
			<Review info={'tourReview'} review={reviews} />
		</div>
	);
}

export default TourReview;
