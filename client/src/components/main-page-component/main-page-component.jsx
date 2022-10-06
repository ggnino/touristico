import './main-page-component-styles.scss';
import React from 'react';
import HeaderComponent from '../header-component/header-component';
import InfoComponent from '../info-component/info-component';
import TourPrev from '../tour-prev-component/tour-prev-component';
import Review from '../review-component/review-component';
import BookNow from '../book-now-component/book-now-component';
import Footer from '../footer-component/footer-component';

function MainPage() {
	// Render component
	return (
		<>
			<div className="container">
				<HeaderComponent />
				<InfoComponent />
				<TourPrev />
				<Review />
				<BookNow />
				<Footer />
			</div>
		</>
	);
}

export default MainPage;
