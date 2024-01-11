export function clearNav(setNavStyle, path = null) {

	if (window.scrollY === 0 && path === "/") {
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


	// header component is in view and scrolling
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
	// info component is in view, while header component is not
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
	// tour component is in view, while info component is not
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
	// reviews component is in view, while tours component is not
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
	/* depending on viewport height, either footer component or the book now component is in view,
	while the reviews component is not
	*/
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
export async function getTour(axios, tours = null) {
	let response = null;
	// get request
	try {
		response = await axios.get('/api/v1/tours');
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
// function for getting tour guides
export async function getGuides(axios) {
	return (await axios.get("/api/v1/users/guides")).data;
}
