import React, { useContext, useEffect, useRef } from "react";
import "./nav-component-styles.scss";
import styleVars from "../../utils/styles/variables.scss";
import { MyContext } from "../../utils/functions/context";
import { scrollAnimation, clearNav } from "../../utils/functions/functions";

function Nav() {
	// useContext hook for app state
	const state = useContext(MyContext);
	// reference variable
	const styleFont = useRef("");
	// Destructuring state
	const {
		navStyle,
		setNavStyle,
		settings,
		font,
		textColor,
		setTextColor,
		onHoverNav,
		mainRefs,
		auth,
		path,
		clicker,
		setPath,
		setUserBorder,
	} = state;

	// useEffect hook for nav styling
	useEffect(() => {
		const fn = () => clearNav(setNavStyle);
		// Scroll event for navbar animation
		if (path === "/") {
			scrollAnimation(mainRefs, setNavStyle, styleVars);

			document.addEventListener("scroll", fn);
		}
		if (path !== "/") {
			console.log("Removed");
			document.removeEventListener("scroll", fn);
		}
		// Set navbar styling by path
		if (path !== "/" && !settings.light) {
			setNavStyle((style) => {
				return {
					...style,
					backgroundColor: "black",
				};
			});
		}
		if (path !== "/home") {
			setNavStyle((style) => {
				return {
					...style,
					displayItems: "",
					class: "nav",
				};
			});
		}

		if (path === "/signup") {
			setNavStyle((s) => {
				return {
					...s,
					borderBottom: `4px solid ${styleVars.color4}`,
					boxShadow: `0 0 2rem ${styleVars.color4}`,
					color: styleVars.color4,
				};
			});
		} else if (path === "/login") {
			setNavStyle((style) => {
				return {
					...style,
					backgroundColor: "black",
					color: styleVars.color5,
					borderBottom: `4px solid ${styleVars.color5}`,
					boxShadow: `0 0 2rem ${styleVars.color5}`,
				};
			});
		} else if (path.includes("tour")) {
			setNavStyle((s) => {
				return {
					...s,
					borderBottom: `4px solid ${styleVars.color3}`,
					boxShadow: `0 0 2rem ${styleVars.color3}`,
					color: styleVars.color3,
				};
			});
		} else if (path === "/about") {
			setNavStyle((s) => {
				return {
					...s,
					borderBottom: `4px solid ${styleVars.color1}`,
					boxShadow: `0 0 2rem ${styleVars.color1}`,
					color: styleVars.color1,
				};
			});
		} else if (path === "/benefits") {
			setNavStyle((s) => {
				return {
					...s,
					borderBottom: `4px solid ${styleVars.color2}`,
					boxShadow: `0 0 2rem ${styleVars.color2}`,
					color: styleVars.color2,
				};
			});
		}
		// Set nav font
		if (font === "") styleFont.current = "";
		else if (font === "bookmania") {
			styleFont.current = { fam: `pill-gothic-900mg`, s: "oblique" };
		} else if (font === "aviano-future") {
			styleFont.current = { fam: "ff-good-headline-web-pro-com", s: "italic" };
		}
		// user is logged in
		if (auth.isLoggedIn) {
			setUserBorder(styleVars.color5);
			setNavStyle((style) => {
				return {
					...style,
					borderBottom: `4px solid ${styleVars.color5}`,
					boxShadow: `0 0 2rem ${styleVars.color5}`,
					color: "inherit",
					displayItems: "none",
				};
			});
			// user saved color settings blue
			if (settings.blue) {
				setUserBorder("#16697A");
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						borderBottom: `4px solid #16697A`,
						boxShadow: `0 0 2rem #16697A`,
					};
				});
			}
			// user saved color settings purple
			else if (settings.purple) {
				setUserBorder("#820263");
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						borderBottom: `4px solid #820263`,
						boxShadow: `0 0 2rem #820263`,
					};
				});
			}
			// user saved color settings yellow
			else if (settings.yellow) {
				setUserBorder("#FFD400");
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						borderBottom: `4px solid #FFD400`,
						boxShadow: `0 0 2rem #FFD400`,
					};
				});
			}
			// user saved color settings red
			else if (settings.red) {
				setUserBorder("#960200");
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						borderBottom: `4px solid #960200`,
						boxShadow: `0 0 2rem #960200`,
					};
				});
			}
			// user saved color settings green
			else if (settings.green) {
				setUserBorder("#B5F44A");
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						borderBottom: `4px solid #B5F44A`,
						boxShadow: `0 0 2rem #B5F44A`,
					};
				});
			}
			// user saved color settings grey
			else if (settings.grey) {
				setUserBorder("#525252");
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						borderBottom: `4px solid #525252`,
						boxShadow: `0 0 2rem #525252`,
					};
				});
			}
			// user saved color settings default
			else if (settings.defaultColor) {
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						borderBottom: `4px solid ${styleVars.color5}`,
						boxShadow: `0 0 2rem ${styleVars.color5}`,
					};
				});
			}
			// user saved theme settings light
			if (settings.light) {
				setTextColor("black");
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						backgroundColor: "white",
						class: "nav light",
					};
				});
			}
			// user saved theme settings dark
			else if (settings.dark) {
				setTextColor("");
				setNavStyle((style) => {
					return {
						...style,
						color: textColor,
						class: "nav",
					};
				});
			}
		} else if (!auth.isLoggedIn && path === "/home") {
			setNavStyle((style) => {
				return {
					...style,
					borderBottom: `4px solid ${styleVars.color5}`,
					boxShadow: `0 0 2rem ${styleVars.color5}`,
					color: "inherit",
					class: "nav",
					displayItems: "",
				};
			});
		}
	}, [
		setNavStyle,
		settings,
		setTextColor,
		textColor,
		mainRefs,
		auth,
		font,
		path,
		setUserBorder,
	]);

	// Render component
	return (
		<nav role={"navigation"} className={navStyle.class} style={navStyle}>
			<div className="nav-logo" tabIndex={0}>
				<a
					tabIndex={0}
					href="/"
					onClick={(e) => {
						setPath("/");
						return;
					}}
				>
					<h2
						className="text-gradient"
						style={
							path === "/home" && auth.isLoggedIn
								? { cursor: "default" }
								: { cursor: "pointer" }
						}
					>
						Touristico
					</h2>
				</a>
			</div>

			<ul>
				<li tabIndex={0} style={{ display: navStyle.displayItems }}>
					<a
						style={
							path === "/about"
								? { color: navStyle.color, textDecoration: navStyle.decoration }
								: {
										fontFamily: styleFont.current.fam,
										fontStyle: styleFont.current.s,
								  }
						}
						id="pp"
						href="/about"
					>
						About Us
					</a>
				</li>
				<li tabIndex={0} style={{ display: navStyle.displayItems }}>
					<a
						style={
							path === "/benefits"
								? { color: navStyle.color, textDecoration: navStyle.decoration }
								: {
										fontFamily: styleFont.current.fam,
										fontStyle: styleFont.current.s,
								  }
						}
						id="con"
						href="/benefits"
					>
						Our Benefits
					</a>
				</li>
				<li tabIndex={0} style={{ display: navStyle.displayItems }}>
					<a
						style={
							path.includes("tour")
								? { color: navStyle.color, textDecoration: navStyle.decoration }
								: {
										fontFamily: styleFont.current.fam,
										fontStyle: styleFont.current.s,
								  }
						}
						id="to"
						href="/tours"
					>
						Tours
					</a>
				</li>

				<li tabIndex={0} style={{ display: navStyle.displayItems }}>
					<a
						style={
							path === "/signup"
								? { color: navStyle.color, textDecoration: navStyle.decoration }
								: {
										fontFamily: styleFont.current.fam,
										fontStyle: styleFont.current.s,
								  }
						}
						id="crr"
						href="/signup"
					>
						Sign Up
					</a>
				</li>
				<li tabIndex={0} style={{ display: navStyle.displayItems }}>
					<a
						style={
							path === "/login"
								? { color: navStyle.color, textDecoration: navStyle.decoration }
								: {
										fontFamily: styleFont.current.fam,
										fontStyle: styleFont.current.s,
								  }
						}
						id="lgl"
						href="/login"
					>
						Login
					</a>
				</li>
				<li tabIndex={0}>
					<a
						onMouseLeave={onHoverNav}
						onMouseEnter={onHoverNav}
						style={
							auth.isLoggedIn
								? {
										display: "",
										fontFamily: styleFont.current.fam,
										fontStyle: styleFont.current.s,
										color: navStyle.color,
								  }
								: { display: "none" }
						}
						href="/"
						onClick={clicker}
						title="logOut"
					>
						Log Out
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default Nav;
