import "./main-page-component-styles.scss";
import React, { useContext, useEffect } from "react";
import HeaderComponent from "../header-component/header-component";
import InfoComponent from "../info-component/info-component";
import TourPrev from "../tour-prev-component/tour-prev-component";
import Review from "../review-component/review-component";
import BookNow from "../book-now-component/book-now-component";
import Footer from "../footer-component/footer-component";
import { MyContext } from "../../utils/functions/context";

function MainPage() {
	// useContext hook for state
	const state = useContext(MyContext);
	// destructuring state
	const { path, setPath } = state;

	// useEffect hook for component mount
	useEffect(() => {
		// if path is not set correctly
		if (window.location.pathname !== path)
			// set homepage path
			setPath("/");
	}, [path, setPath]);
	// Render component
	return (
		<main className="container">
			<HeaderComponent />
			<InfoComponent />
			<TourPrev />
			<Review />
			<BookNow />
			<Footer />
		</main>
	);
}

export default MainPage;
