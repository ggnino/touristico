export function clearNav(setNavStyle) {

	if (window.scrollY === 0) {
		setNavStyle((style) => {
			return {
				...style,
				backgroundColor: "transparent",
				borderBottom: ``,
				boxShadow: "",
			};
		});
	}
}

// function for scroll animation on homepage
export function scrollAnimation(viewRefs, setNavStyle, styleVars) {

	const { head: headerView, info: infoView, tour: toursView, book: bookView, rev: reviewsView, footer: footerView } = viewRefs;


	// view one valid
	if (headerView && window.scrollY !== 0) {
		// set nav styles for current view
		setNavStyle((style) => {
			return {
				...style,
				backgroundColor: 'black',
				borderBottom: ``,
				boxShadow: '',
			};
		});
	}
	// view two valid, while view one is not
	if (infoView && !headerView) {
		// set nav styles for current view
		setNavStyle((style) => {
			return {
				...style,
				borderBottom: `2px solid ${styleVars.color1}`,
				boxShadow: `0 0 1rem ${styleVars.color1}`,
			};
		});
	}
	// view three valid, while view two is not
	if (toursView && !infoView) {
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
	if (reviewsView && !toursView) {
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
	if ((footerView && !reviewsView) || (bookView && !reviewsView)) {

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
export async function getTour(controller, axios, tours = null) {
	let response = null;
	// get request
	try {
		response = await axios.get('/api/v1/tours', {
			signal: controller.signal,
		});
		if (tours) return response.data;
	} catch (err) { console.log(err) }


	// tours info
	const { Tours } = response.data;

	// tour slug from url
	const slug = window.location.pathname.split('/')[2];
	// actual tour
	const actual = Tours.filter((tour) => tour.slug === slug)[0];

	return actual;
}
