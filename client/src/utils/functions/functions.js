// function for scroll animation on homepage
export function scrollAnimation(
	myView1,
	myView2,
	myView3,
	myView4,
	myView5,
	setNavStyle,
	styleVars,
	e
) {
	// view one valid
	if (myView1) {
		// set nav styles for current view
		setNavStyle((style) => {
			return {
				...style,
				backgroundColor: '',
				borderBottom: ``,
				boxShadow: '',
			};
		});
	}
	// view two valid, while view one is not
	if (myView2 && !myView1) {
		// set nav styles for current view
		setNavStyle((style) => {
			return {
				...style,
				backgroundColor: 'black',
				borderBottom: `2px solid ${styleVars.color1}`,
				boxShadow: `0 0 1rem ${styleVars.color1}`,
			};
		});
	}
	// view three valid, while view two is not
	if (myView3 && !myView2) {
		// set nav styles for current view
		setNavStyle((style) => {
			return {
				...style,
				boxShadow: `0 0 1rem ${styleVars.color3}`,
				borderBottom: `2px solid ${styleVars.color3}`,
			};
		});
	}
	// view four valid, while view three is not
	if (myView4 && !myView3) {
		// set nav styles for current view
		setNavStyle((style) => {
			return {
				...style,
				boxShadow: `0 0 1rem ${styleVars.color4}`,
				borderBottom: `2px solid ${styleVars.color4}`,
			};
		});
	}
	// view five valid, while view four is not
	if (myView5 && !myView4) {
		// set nav styles for current view
		setNavStyle((style) => {
			return {
				...style,
				boxShadow: `0 0 2rem ${styleVars.color5}`,
				borderBottom: `2px solid ${styleVars.color5}`,
			};
		});
	}
}
// function for getting a tour
export async function getTour(controller, axios) {
	// get request
	const response = await axios.get('/api/v1/tours', {
		signal: controller.signal,
	});
	// tours info
	const { Tours } = response.data;

	// tour slug from url
	const slug = window.location.pathname.split('/')[2];
	// actual tour
	const actual = Tours.filter((tour) => tour.slug === slug)[0];

	// return tour
	return actual;
}
