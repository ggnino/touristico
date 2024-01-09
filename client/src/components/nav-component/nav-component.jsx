import React, { useContext } from "react";
import "./nav-component-styles.scss";

import { MyContext } from "../../utils/functions/context";

function Nav() {
	// useContext hook for app state
	const state = useContext(MyContext);

	// Destructuring state
	const { NavStyler, navStyle, onHoverNav, auth, path, clicker, styleFont } =
		state;

	NavStyler();

	// Render component
	return (
		<nav role={"navigation"} className={navStyle.class} style={navStyle}>
			<div className="nav-logo" tabIndex={0}>
				<a
					tabIndex={0}
					href={path === "/home" && auth.isLoggedIn ? "/home" : "/"}
				>
					<h2 className="text-gradient">Touristico</h2>
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
						id="logOut"
					>
						Log Out
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default Nav;
