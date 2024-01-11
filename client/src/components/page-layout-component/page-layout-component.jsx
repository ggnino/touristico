import React, { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { MyContext } from "../../utils/functions/context";

function PageLayout() {
	// useContext hook for state
	const state = useContext(MyContext);

	// destructuring state
	const {
		pageLayoutStyle,
		setPageLayoutStyle,
		auth,
		settings,
		setSettings,
		userBorder,
		setUserBorder,
		layoutDisplay,
		setLayoutDisplay,
		setTextColor,
		setFont,
		setUserMenu,
		path,
		setPath,
		setHide,
		style,
		setStyle,
	} = state;

	// useEffect hook for styling
	useEffect(() => {
		// if user is in home page
		if (path === "/home" && auth.isLoggedIn) {
			// set user settings
			// default color
			if (settings.defaultColor) {
				setUserBorder("#db0000");
				setStyle((style) => {
					return {
						...style,
						borderLeft: ``,
						borderRight: ``,
						boxShadow: ``,
					};
				});
			}
			// apply green color
			else if (settings.green) {
				setUserBorder("#B5F44A");
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #B5F44A`,
						borderRight: `4px solid #B5F44A`,
						boxShadow: `0 0 2rem #B5F44A`,
					};
				});
			}
			// apply yellow color
			else if (settings.yellow) {
				setUserBorder("#FFD400");
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #FFD400`,
						borderRight: `4px solid #FFD400`,
						boxShadow: `0 0 2rem #FFD400`,
					};
				});
			}
			// apply red color
			else if (settings.red) {
				setUserBorder("#960200");
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #960200`,
						borderRight: `4px solid #960200`,
						boxShadow: `0 0 2rem #960200`,
					};
				});
			}
			// apply blue color
			else if (settings.blue) {
				setUserBorder("#16697A");
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #16697A`,
						borderRight: `4px solid #16697A`,
						boxShadow: `0 0 2rem #16697A`,
					};
				});
			}
			// apply purple color
			else if (settings.purple) {
				setUserBorder("#820263");
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #820263`,
						borderRight: `4px solid #820263`,
						boxShadow: `0 0 2rem #820263`,
					};
				});
			}
			// apply grey color
			else if (settings.grey) {
				setUserBorder("#525252");
				setStyle((style) => {
					return {
						...style,
						borderLeft: `4px solid #525252`,
						borderRight: `4px solid #525252`,
						boxShadow: `0 0 2rem #525252`,
					};
				});
			}
			// apply light theme
			if (settings.light) {
				setLayoutDisplay((l) => {
					return {
						display: "none",
						backgroundImage: "",
						backgroundColor: "white",
					};
				});
				setStyle((style) => {
					return {
						...style,
						backgroundColor: "white",
					};
				});
			}
			// apply dark theme
			else if (settings.dark) {
				setLayoutDisplay((l) => {
					return {
						display: "none",
						backgroundImage: "",
						backgroundColor: "",
					};
				});
				setStyle((style) => {
					return {
						...style,
						backgroundColor: "",
					};
				});
			}
			setLayoutDisplay((d) => {
				return {
					...d,
					backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), linear-gradient(to bottom, ${userBorder}, ${userBorder})`,
				};
			});
		}

		// hide user homepage if not logged in and display error
		if (!auth.isLoggedIn && path === "/home") {
			// display error message
			setHide((h) => {
				return {
					...h,
					err: "",
				};
			});
		}
		const pageStyle = path.split("/")[1];

		const tourStyle = path.includes("tours") ? "tour" : "";

		// set page styling classses
		setPageLayoutStyle((s) => {
			return {
				...s,
				class1: `container ${pageStyle} ${tourStyle} page-layout`,
				class2: `${pageStyle}-content ${
					tourStyle !== ""
						? tourStyle + "-content content-layout"
						: tourStyle + "content-layout content-flow flex flex-col"
				}`,
			};
		});
	}, [
		path,
		setPath,
		setUserMenu,
		auth,
		setPageLayoutStyle,
		settings,
		setUserBorder,
		userBorder,
		setLayoutDisplay,
		setSettings,
		setTextColor,
		setFont,
		setHide,
		setStyle,
	]);

	// Render component
	return (
		<div
			className={pageLayoutStyle.class1}
			style={
				pageLayoutStyle.class1.includes("login") ||
				(path === "/home" && !auth.isLoggedIn)
					? layoutDisplay
					: {
							display: "",
							backgroundImage: layoutDisplay.backgroundImage,
							backgroundColor: layoutDisplay.backgroundColor,
							scrollbarColor: userBorder + " black",
					  }
			}
		>
			<section
				tabIndex={0}
				className={pageLayoutStyle.class2}
				style={
					path === "/home" ? style : { overflow: pageLayoutStyle.overflow }
				}
			>
				<Outlet />
			</section>
		</div>
	);
}

export default PageLayout;
