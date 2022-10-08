import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { MyContext } from '../../utils/functions/context';
import Review from '../review-component/review-component';
import './tour-review-component-styles.scss';

function TourReview(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { setHide, reviews, SetReviews, isMountedTR, setIsMountedTR } = state;
	// useEffect hook for retrieving review data
	useEffect(() => {
		if (
			window.location.pathname.includes('/tours/') &&
			isMountedTR &&
			props.id !== 'ID'
		)
			axios
				.get(`/api/v1/tours/id/${props.id}/reviews`, {
					signal: new AbortController().signal,
				})
				.then((res) => {
					console.log('done!');
					setHide((h) => {
						return {
							...h,
							loader: 'none',
							err: 'none',
						};
					});
					SetReviews(res.data);
				})
				.catch((err) => {
					setHide((h) => {
						return {
							...h,
							loader: 'none',
							err: '',
						};
					});
				});
		// cancel request on component unmount
		return () => {
			const controller = new AbortController();
			controller.abort();
			setIsMountedTR(false);
		};
	}, [props.id, isMountedTR, SetReviews, setIsMountedTR, setHide]);
	// Render component
	return (
		<div className="tourReview" style={{ display: props.display }}>
			<Review info={'tourReview'} review={reviews} />
		</div>
	);
}

export default TourReview;
