import { useEffect, useRef, useState } from 'react';

export default function useIntersection(element, threshold = 1) {
	const [elementView, setElementView] = useState(0);
	// const [prevRatio, setPrevRatio] = useState(0);
	const prevRatio = useRef(null);
	// let prevRatio = null;
	const observer = useRef(
		new IntersectionObserver(
			([entry]) => {
				//1280
				//0
				//0
				//0.81
				//0.92

				if (entry.isIntersecting) {
					console.log(entry.target.className, entry.intersectionRatio);
					// if (
					// 	entry.target.className.includes('footer') &&
					// 	entry.intersectionRatio < prevRatio &&
					// 	entry.intersectionRatio < 0.9
					// ) {

					// 	// setElementView(false);
					// }
					// if (prevRatio > entry.intersectionRatio) setElementView(false);
					if (
						entry.target.className.includes('header') &&
						entry.intersectionRatio > 0.24
					) {
						console.log('Regular!!!!!!!', entry.target.className);
						setElementView(true);
					} else if (
						entry.target.className.includes('header') &&
						entry.intersectionRatio <= 0.24
					) {
						console.log('Regular!!!!!!!', entry.target.className);
						setElementView(false);
					} else if (
						entry.target.className.includes('info') &&
						entry.intersectionRatio >= 0.84
					) {
						console.log('Regular!!!!!!!', entry.target.className);
						setElementView(true);
					} else if (
						entry.target.className.includes('info') &&
						entry.intersectionRatio < 0.84
					) {
						console.log('Regular!!!!!!!', entry.target.className);
						setElementView(false);
					}

					// setPrevRatio(entry.intersectionRatio);
					prevRatio.current = entry.intersectionRatio;
				}

				// else setElementView(false);
			},
			{ threshold }
		)
	);
	useEffect(() => {
		const { current: currentObserver } = observer;
		currentObserver.observe(element.current);
		// element.current && observer.observe(element.current);

		return () => observer.unobserve(currentObserver);
	}, [element, threshold]);

	return elementView;
}
