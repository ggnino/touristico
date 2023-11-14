import React, { useContext, useEffect, useRef } from "react";
import "./footer-component-styles.scss";
import img1 from "../../imgs/brand.png";
import { MyContext } from "../../utils/functions/context";
import { useInView } from "react-intersection-observer";

function Footer() {
	const state = useContext(MyContext);
	const { setMainRefs } = state;

	const threshold = useRef([0.56, 0.06]);
	const [ref, inView] = useInView({
		threshold: threshold.current,
	});

	// useEffect hook for observing component
	useEffect(() => {
		if (window.innerHeight < 1366) {
			// Chechking to see if component in user view
			if (inView) {
				// set view to true
				setMainRefs((r) => {
					return {
						...r,
						footer: inView,
					};
				});
			}
			// set view to false
			else
				setMainRefs((r) => {
					return {
						...r,
						footer: inView,
					};
				});
		}
	}, [inView, setMainRefs]);
	// Render component
	return (
		<footer className="footer flex flex-col" ref={ref}>
			<div className="footer-content flex">
				<ul className="flex">
					<li>
						<a id="pp" href="#!">
							Privacy Policy
						</a>
					</li>
					<li>
						<a id="tos" href="#!">
							Terms Of Service
						</a>
					</li>
					<li>
						<a id="con" href="#!">
							Contact Us
						</a>
					</li>
					<li>
						<a id="crr" href="#!">
							Careers
						</a>
					</li>
					<li>
						<a id="lgl" href="#!">
							Legal
						</a>
					</li>
				</ul>
				<img src={img1} alt="The company logo for touristico tours." />
				<p>
					Built by Guillermo Gonzalez for demonstration purposes only. For
					custom design options or any other questions contact me{" "}
					<a href="mailto:ggnino18@gmail.com" rel="noreferrer" target="_blank">
						here.
					</a>
				</p>
			</div>
		</footer>
	);
}

export default Footer;
