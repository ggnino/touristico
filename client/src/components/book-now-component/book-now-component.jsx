import React, { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { MyContext } from "../../utils/functions/context";
import Button from "../button-component/button-component";
import "./book-now-component-styles.scss";

function BookNow() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { setMainRefs, onChange, mainRefs } = state;
	// useInView hook for observing component
	const [ref, inView] = useInView({
		threshold: [0.86, 0.01],
	});
	// useEffect hook for observing component
	useEffect(() => {
		// Chechking to see if component in user view
		if (inView && !mainRefs.book) {
			// set component to true
			setMainRefs((r) => {
				return {
					...r,
					book: inView,
				};
			});
		}
		// set component to false
		else if (!inView && mainRefs.book)
			setMainRefs((r) => {
				return {
					...r,
					book: inView,
				};
			});
	}, [mainRefs.book, inView, setMainRefs]);
	// Render component
	return (
		<section className="booking flex flex-col" ref={ref}>
			<div className="title">
				<h2>Book your adventure</h2>
			</div>
			<div className="booking-content">
				<form
					className="booking-content-form flex flex-col"
					action=""
					onChange={onChange}
				>
					<h2>BOOK NOW!</h2>
					<fieldset className="booking-content-form-group">
						<input id="name" type="text" name="name" placeholder="Name:" />
						<label id="m" htmlFor="name">
							Name:
						</label>
					</fieldset>

					<fieldset className="booking-content-form-group">
						<input id="email" type="email" name="email" placeholder="Email:" />
						<label id="m" htmlFor="email">
							Email:
						</label>
					</fieldset>
					<fieldset className="booking-content-form-group">
						<input
							type="number"
							name="group"
							placeholder="Group-size:"
							min={1}
							max={30}
							defaultValue={1}
							id="group"
						/>
						<label id="m" htmlFor="group">
							Group-size:
						</label>
						<Button msg={"Continue"} class={"book"} id={"bookNow"} />
					</fieldset>
				</form>
			</div>
		</section>
	);
}

export default BookNow;
