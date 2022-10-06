import React, { useContext, useEffect } from 'react';
import './about-page-component-styles.scss';
import img1 from '../../imgs/brand.png';
import UserIcon from '../user-icon-component/user-icon-component';
import axios from 'axios';
import { MyContext } from '../../utils/functions/context';
import ErrorComponent from '../error-component/error-component';

function AboutPage(props) {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { hide, setHide, setAuth, guides, setGuides, mainRefs } = state;
	// useEffect hook for retrieving tour guides
	useEffect(() => {
		// user came from info component
		if (mainRefs.mio) {
			window.location.reload();
		}
		axios
			.get('/api/v1/users/guides')
			.then((res) => {
				// hide loader component
				setHide((h) => {
					return {
						...h,
						loader: 'none',
						err: 'none',
					};
				});
				// set tour guides
				setGuides([...res.data.tourGuides]);
			})
			.catch((err) => {
				// hide loader component
				setHide((h) => {
					return {
						...h,
						loader: 'none',
						err: '',
					};
				});
			});
	}, [setGuides, setAuth, mainRefs, setHide]);
	// Render component
	return (
		<>
			<h1 className="my-heading" style={{ display: props.style }}>
				About Us
			</h1>
			<div className="about-content-us" style={{ display: props.style }}>
				<img src={img1} alt="" />
				<ul>
					<li>
						<span>Founded in 2010</span>,
						<span className="text-gradient">Touristico</span> is a family
						owned/operated eco friendly tourist company. With the support of
						different travel agencies from all over Latin America, USA, Canada,
						Europe and Asia, we’ve been able to grow by providing a fun and safe
						experience for everyone around us.
					</li>
					<li>
						<span>Our passion</span>
						is not just to seek adventure, but also adding a purpose to it.
						Traveling can be the base to have tighter bonds between society,
						nature and the world; while connecting locals and incoming
						travelers. We help our guests to get the best experience out of
						their adventure in any part of the world, while being eco and
						socially responsible.
					</li>

					<li>
						<span>Our mission</span>
						is to provide well organized and personalized tour that will make
						each experience great and unique! To ensure a wonderful experience
						for each of our guests is our business, we will offer outstanding
						service before, during and after the tour; always looking to surpass
						our guest’s expectations.
					</li>
					<li>
						<span>Our vision </span>
						at <span className="text-gradient">Touristico</span> is to be the
						preferred tour company in the world by investing our energy and
						resources into creating wonderful memories/experiences for our
						travelers. We take pride of being part of a network of highly
						ethically responsible tour operators.
					</li>
				</ul>
			</div>
			<h2 className="my-heading">Our Tour Guides</h2>
			<div className="about-content-guides" style={{ display: props.style }}>
				<div
					className="load ld ld-ring ld-cycle"
					style={{ display: hide.loader }}
				></div>
				{guides.length > 0 ? (
					guides.map((guide, index) => (
						<UserIcon
							key={`Guide${index}: ${guide.name}`}
							img={guide.photo}
							name={guide.name}
							id={'guides'}
						/>
					))
				) : (
					<ErrorComponent msg={'ERROR! RETRIVING TOUR GUIDES!'} />
				)}
			</div>
		</>
	);
}

export default AboutPage;
