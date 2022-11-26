import React from 'react';
import StarRating from '../star-rating-component/star-rating-component';
import UserIcon from '../user-icon-component/user-icon-component';

function DefaultReviews() {
	// Render component
	return (
		<>
			<h2 className="title">What an a experience!</h2>
			<div className="star-ratings">
				<StarRating />
				<StarRating />
				<StarRating />
				<StarRating />
				<StarRating />
			</div>
			<div className="reviews-content-user">
				<UserIcon name={'Eduardo Hernandez'} img={'/imgs/users/user-18.jpg'} />

				<p id="userReview">
					<q>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
						tenetur nulla ex enim quasi voluptate dolores provident ea excepturi
						itaque? lsodkv dfb kjsdcccccccccsss
					</q>{' '}
					<br />
					by <span>Eduardo Hernandez</span>
				</p>
			</div>
			<h2 className="title">LOOOVEE IT!</h2>
			<div className="star-ratings">
				<StarRating />
				<StarRating />
				<StarRating />
				<StarRating />
				<StarRating />
			</div>
			<div className="reviews-content-user">
				<UserIcon img={'/imgs/users/user-20.jpg'} />

				<p id="userReview">
					<q>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
						tenetur nulla ex enim quasi voluptate dolores provident ea excepturi
						itaque?
					</q>
					<br />
					by <span>Lisa Brown</span>
				</p>
			</div>
			<h2 className="title">Amazing!</h2>
			<div className="star-ratings">
				<StarRating />
				<StarRating />
				<StarRating />
				<StarRating />
				<StarRating />
			</div>
			<div className="reviews-content-user">
				<UserIcon img={'/imgs/users/user-4.jpg'} />

				<p id="userReview">
					<q>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
						tenetur nulla ex enim quasi voluptate dolores provident ea excepturi
						itaque?
					</q>
					<br />
					by <span>Ayla Cornell</span>
				</p>
			</div>
		</>
	);
}

export default DefaultReviews;
