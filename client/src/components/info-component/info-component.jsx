import React, { useContext, useEffect, useRef } from "react";
import "./info-component-styles.scss";
import img1 from "../../imgs/tour1.jpg";
import img2 from "../../imgs/nat-8.jpg";
import img3 from "../../imgs/tour2.jpg";
import Button from "../button-component/button-component";
import { MyContext } from "../../utils/functions/context";
import { useInView } from "react-intersection-observer";
function InfoComponent() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// Destructuring state
	const { setMainRefs } = state;
	const threshold = useRef([0.86, 0.12]);
	// Adjust threshold by viewport
	if (window.visualViewport.width > 1400) {
		// threshold.current = 0.12;
	}
	// useInView hook for obsercing component
	const [ref, inView] = useInView({
		threshold: threshold.current,
	});
	// useEffect hook for observing component
	useEffect(() => {
		// Chechking to see if component in user view
		if (inView) {
			// set component to true
			setMainRefs((r) => {
				return {
					...r,
					info: inView,
				};
			});
		}
		// set component to false
		else
			setMainRefs((r) => {
				return {
					...r,
					info: inView,
				};
			});
	}, [inView, setMainRefs]);
	// Render component
	return (
		<section className="container info-comp flex flex-col" ref={ref}>
			<div className="info-comp title">
				<h2>
					Traveling has never felt so{" "}
					<span className="text-gradient">Touristico!</span>
				</h2>
			</div>
			<div className="info-comp-content flex">
				<div className="info-comp-content-articles flex flex-col">
					<article className="">
						<h3>Explore the world</h3>

						<p>
							Planet Earth sure is vast, majestic and beautiful. There is many
							ways to explore the world, but what better way than in one of our
							exciting tours. Safety is our number one concern for all of us
							here. All tours are assigned a difficulty to make sure all parties
							are safe and having fun. Also assigned are our professional tour
							guides, who not only inform you and assist you; but makes sure the
							vibes are just right!
						</p>
					</article>
					<article className="">
						<h3>Have an adventure of a lifetime</h3>

						<p>
							At <span className="emphasis text-gradient">Touristico </span>{" "}
							tours, you can get some alone time and be one with nature. Our
							breath-taking tours will leave you wanting more outdoor time. You
							can also come with the family to make memories, in a fun worldy
							adventure or to cool off and have some family relaxation. With
							many locations across the world, we guarantee you will get to know
							the world around you better!
						</p>
					</article>
					<Button msg={"Learn more"} class={"info"} link={"/about"} />
				</div>

				<div className="info-comp-content-imgs">
					<img
						id="snowyImg"
						src={img2}
						alt="A tourist walking up snowy mountain on skis."
					/>
					<img
						id="waterfallImg"
						src={img1}
						alt="A beautiful waterfall shot of a tour."
					/>
					<img
						id="hotBallonImg"
						src={img3}
						alt="Weather ballons traveling in the sky."
					/>
				</div>
			</div>
		</section>
	);
}

export default InfoComponent;
