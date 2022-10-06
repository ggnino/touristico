import React, { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { MyContext } from '../../utils/functions/context';
import Button from '../button-component/button-component';
import './book-now-component-styles.scss';

function BookNow() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { setMainRefs, onChange } = state;
	// useInView hook for observing component
	const [ref, inView] = useInView({
		threshold: 0.1,
	});
	// useEffect hook for observing component
	useEffect(() => {
		// Chechking to see if component in user view
		if (inView) {
			setMainRefs((r) => {
				return {
					...r,
					book: inView,
				};
			});
		} else
			setMainRefs((r) => {
				return {
					...r,
					book: inView,
				};
			});
	}, [inView, setMainRefs]);
	// Render component
	return (
		<div className="booking" ref={ref}>
			<div className="title">
				<h2>Book your adventure</h2>
			</div>
			<div className="booking-content">
				<form className="booking-content-form" action="" onChange={onChange}>
					<h2>BOOK NOW!</h2>
					<div className="booking-content-form-group">
						<input type="text" name="name" placeholder="Name:" />
						<label id="m" htmlFor="name">
							Name:
						</label>
					</div>

					<div className="booking-content-form-group">
						<input type="email" name="email" placeholder="Email:" />
						<label id="m" htmlFor="email">
							Email:
						</label>
					</div>
					<div className="booking-content-form-group">
						<input
							type="number"
							name="group"
							placeholder="Group-size:"
							min={1}
							max={30}
							defaultValue={1}
						/>
						<label id="m" htmlFor="group">
							Group-size:
						</label>
						<Button msg={'Continue'} class={'book'} link={'/signup'} />
					</div>
				</form>
			</div>
		</div>
	);
}

export default BookNow;
