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
	if (myView1) {
		setNavStyle((style) => {
			return {
				...style,
				backgroundColor: '',
				borderBottom: ``,
				boxShadow: '',
			};
		});
	}
	if (myView2 && !myView1) {
		setNavStyle((style) => {
			return {
				...style,
				backgroundColor: 'black',
				borderBottom: `2px solid ${styleVars.color1}`,
				boxShadow: `0 0 1rem ${styleVars.color1}`,
			};
		});
	}
	if (myView3 && !myView2) {
		setNavStyle((style) => {
			return {
				...style,
				boxShadow: `0 0 1rem ${styleVars.color3}`,
				borderBottom: `2px solid ${styleVars.color3}`,
			};
		});
	}
	if (myView4 && !myView3) {
		setNavStyle((style) => {
			return {
				...style,
				boxShadow: `0 0 1rem ${styleVars.color4}`,
				borderBottom: `2px solid ${styleVars.color4}`,
			};
		});
	}

	//
	if (myView5 && !myView4) {
		setNavStyle((style) => {
			return {
				...style,
				boxShadow: `0 0 2rem ${styleVars.color5}`,
				borderBottom: `2px solid ${styleVars.color5}`,
			};
		});
	}
}
export async function getTour(controller, axios) {
	const response = await axios.get('/api/v1/tours', {
		signal: controller.signal,
	});

	const { Tours } = response.data;

	const slug = window.location.pathname.split('/')[2];
	const actual = Tours.filter((tour) => tour.slug === slug)[0];

	return actual;
}
