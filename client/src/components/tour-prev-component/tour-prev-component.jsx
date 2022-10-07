import React, { useContext, useEffect, useRef } from 'react';
import './tour-prev-component-styles.scss';
import Button from '../button-component/button-component';
import axios from 'axios';
import { MyContext } from '../../utils/functions/context';
import { Link } from 'react-router-dom';
import ErrorComponent from '../error-component/error-component';
import { useInView } from 'react-intersection-observer';

function TourPrev() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { tours, setTours, setHide, setMainRefs } = state;
	// reference variable for retrieving data
	const dif = useRef(null);
	const chrome = useRef(false);
	// threshold percentage for useInView hook
	const threshold = useRef(0.1);
	// Adjust threshold by viewport
	if (window.visualViewport.width > 1400) {
		chrome.current = true;
		threshold.current = 0.065;
	}
	if (window.visualViewport.width < 1200) {
		console.log(window.visualViewport);
		threshold.current = 0.035;
	}
	if (window.visualViewport.height === 900) {
		threshold.current = 0.09;
	}
	if (window.visualViewport.height < 900) {
		threshold.current = 0.06;
	}
	if (window.visualViewport.height < 860) {
		threshold.current = 0.07;
	}
	// useInView hook for obsercing component
	const [ref, inView] = useInView({
		threshold: threshold.current,
	});
	// useEffect hook for retrieving tour data and observing component
	useEffect(() => {
		// Chechking to see if component in user view
		if (inView) {
			setMainRefs((r) => {
				return {
					...r,
					tour: inView,
				};
			});
		} else
			setMainRefs((r) => {
				return {
					...r,
					tour: false,
				};
			});
		// checks to see if tour data has been retrieved
		if (!dif.current) {
			dif.current = 1;
			axios
				.get('/api/v1/tours')
				.then((response) => {
					console.log(55, response);
					setTours(response.data.Tours);
					setHide((h) => {
						return {
							...h,
							err: 'none',
						};
					});
				})
				.catch((err) => {
					console.log(err);
					setHide((h) => {
						return {
							...h,
							loader: 'none',
							err: '',
						};
					});
				});
		}
	}, [setTours, setHide, inView, setMainRefs]);
	// Render component
	return (
		<div className="container tour-prev" id="tour-prev" ref={ref}>
			<div className="tour-prev title">
				<h2>Most popular tours</h2>
			</div>

			<div className="tour-prev-content">
				{tours
					? tours.map((tour, index) => {
							if (
								(index === 0 && tour.difficulty === 'easy') ||
								(index === 1 && tour.difficulty === 'medium') ||
								(index === 3 && tour.difficulty === 'difficult')
							) {
								return (
									<Link
										className="tour-prev-content"
										to={`/tours/${tour.slug}`}
										state={tour}
										key={`${tour.name} ${index}`}
									>
										<div
											key={`${tour.name}-${index}`}
											className="tour-prev-content-cards"
										>
											<div
												className="img-holder"
												id={
													tour.difficulty === 'easy'
														? 'one'
														: tour.difficulty === 'medium'
														? 'two'
														: 'three'
												}
											>
												<img
													src={`/imgs/tours/${tour.imageCover}`}
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
													Difficulty:{' '}
													<span
														style={
															tour.difficulty === 'easy'
																? { color: '#00916e' }
																: tour.difficulty === 'medium'
																? { color: '#ee6123' }
																: { color: '#db0000' }
														}
													>
														{' '}
														{tour.difficulty}
													</span>
												</li>
											</ul>
										</div>
									</Link>
								);
							} else return '';
					  })
					: ''}
			</div>
			<ErrorComponent msg={'OOOPS! TOUR ERROR!'} />
			<Button msg={'More Tours'} class={'info'} link={'tours'} />
		</div>
	);
}

export default TourPrev;
