import React from 'react';
import img from '../../imgs/star.png';
function StarRating(props) {
	// Render component
	return (
		<img key={props.key1} className="star-rating" src={img} alt="star-rating" />
	);
}

export default StarRating;
