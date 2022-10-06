import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutPage from './components/about-page-component/about-page-component';
import BenefitsPage from './components/benefits-page-component/benefits-page-component';
import LoginPage from './components/login-page-component/login-page-component';
import MainPage from './components/main-page-component/main-page-component';
import Nav from './components/nav-component/nav-component';
import PageLayout from './components/page-layout-component/page-layout-component';
import Signup from './components/signup-component/signup-component';
import TourPage from './components/tour-page-component/tour-page-component';
import ToursPage from './components/tours-page-component/tours-page-component';
import UserPage from './components/user-page-component/user-page-component';

function Appy() {
	return (
		<>
			<Nav />
			<Routes>
				<Route exact path="/" element={<MainPage />} />
				<Route path="/*" element={<PageLayout />}>
					<Route path="about" element={<AboutPage />} />
					<Route path="benefits" element={<BenefitsPage />} />
					<Route path="signup" element={<Signup />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="tours/tour" element={<TourPage />} />
					<Route path="tours" element={<ToursPage />} />
					<Route path="home" element={<UserPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default Appy;
