import React, { useContext, useEffect, useRef } from 'react';
import './review-component-styles.scss';
import img1 from '../../imgs/chilling2.mp4';
import StarRating from '../star-rating-component/star-rating-component';
import UserIcon from '../user-icon-component/user-icon-component';
import { MyContext } from '../../utils/functions/context';
import DefaultReviews from '../default-reviews-component/default-reviews-component';
import { useInView } from 'react-intersection-observer';
function Review(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { hide, setMainRefs } = state;
	// Destructuring props
	const { review } = props;
	// threshold percentage for useInView hook
	const threshold = useRef(0.07);
	// Adjust threshold by viewport
	if (window.visualViewport.height < 1200) {
		threshold.current = 0.06;
	}
	if (window.visualViewport.height < 1100) {
		threshold.current = 0.05;
	}
	if (window.visualViewport.height < 1000) {
		threshold.current = 0.075;
	}
	if (window.visualViewport.height <= 800) {
		threshold.current = 0.08;
	}
	// useInView hook for obsercing component
	const [ref, inView] = useInView({
		threshold: threshold.current,
	});
	// useEffect hook for observing component
	useEffect(() => {
		// Chechking to see if component in user view
		if (inView) {
			// set view to true
			setMainRefs((r) => {
				return {
					...r,
					rev: inView,
				};
			});
		}
		// set view to false
		else
			setMainRefs((r) => {
				return {
					...r,
					rev: inView,
				};
			});
	}, [inView, setMainRefs]);
	// Render component
	return (
		<div className="container reviews" ref={ref}>
			<div className="title">
				<h2>
					{props.info ? 'Reviews' : 'Making friends and experiences together'}
				</h2>
			</div>

			<div
				className="bg-video"
				style={
					props.info === 'tourReview' ? { display: 'none' } : { display: '' }
				}
			>
				<video src={img1 || ''} autoPlay muted loop></video>
			</div>
			<div
				className={
					props.info === 'tourReview'
						? `reviews-content ${props.info}`
						: 'reviews-content'
				}
			>
				{window.location.pathname !== '/' ? (
					<>
						<div
							className="load ld ld-ring ld-cycle"
							style={{ display: hide.loader }}
						></div>
						{review.Reviews ? (
							review.Reviews.map((r, index) => {
								let title = '';
								if (r.rating > 4) title = 'What an a experience!';
								if (r.rating === 4) title = 'Amazing!';
								if (r.rating === 3) title = 'It is OK.';
								else if (r.rating < 3) title = 'Horrible experience.';

								return (
									<React.Fragment key={`${r.name}${index}555555555555`}>
										<h2 key={`${r.user.name}${index}`} className="title">
											{title}
										</h2>
										<div
											key={`${r.user.name}${index + 1}`}
											className="star-ratings"
										>
											{r.rating === 5 ? (
												<>
													<StarRating key={`${r.user.name}${index + 26}`} />
													<StarRating key={`${r.user.name}${index + 266}`} />
													<StarRating key={`${r.user.name}${index + 222}`} />
													<StarRating key={`${r.user.name}${index + 255}`} />
													<StarRating key={`${r.user.name}${index + 288}`} />
												</>
											) : r.rating === 4 ? (
												<>
													<StarRating key={`${r.user.name}${index + 25}`} />
													<StarRating key={`${r.user.name}${index + 2223}`} />
													<StarRating key={`${r.user.name}${index + 2353}`} />
													<StarRating key={`${r.user.name}${index + 2557}`} />
												</>
											) : r.rating === 3 ? (
												<>
													<StarRating key={`${r.user.name}${index + 2858}`} />
													<StarRating key={`${r.user.name}${index + 220}`} />
													<StarRating key={`${r.user.name}${index + 782}`} />
												</>
											) : r.rating === 2 ? (
												<>
													<StarRating key={`${r.user.name}${index + 22}`} />
													<StarRating key={`${r.user.name}${index + 21}`} />
												</>
											) : (
												<StarRating key={`${r.user.name}${index + 20}`} />
											)}
										</div>
										<div
											key={`${r.user.name}${index + 2}`}
											className="reviews-content-user"
										>
											<UserIcon
												key={`${r.user.name}${index + 200}`}
												id={'review'}
												img={`${r.user.photo}`}
											/>

											<p key={`${r.user.name}${index + 3}`} id="userReview">
												{r.review}
												<br />
												by{' '}
												<span key={`${r.user.name}${index + 2}`}>
													{r.user.name}
												</span>
											</p>
										</div>
									</React.Fragment>
								);
							})
						) : (
							<h1 key={`sss`} className="load" style={{ display: hide.err }}>
								OOPS! AN ERROR!
							</h1>
						)}
					</>
				) : (
					<DefaultReviews />
				)}
			</div>
		</div>
	);
}

export default Review;
