import React, { useEffect, useRef, useState } from "react";
import MainPage from "./components/main-page-component/main-page-component.jsx";
import "./App.scss";
import AboutPage from "./components/about-page-component/about-page-component.jsx";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import BenefitsPage from "./components/benefits-page-component/benefits-page-component.jsx";
import Signup from "./components/signup-component/signup-component.jsx";
import LoginPage from "./components/login-page-component/login-page-component.jsx";
import ToursPage from "./components/tours-page-component/tours-page-component.jsx";
import { MyContext } from "./utils/functions/context.js";
import TourPage from "./components/tour-page-component/tour-page-component.jsx";
import PageLayout from "./components/page-layout-component/page-layout-component.jsx";
import Nav from "./components/nav-component/nav-component.jsx";
import UserPage from "./components/user-page-component/user-page-component.jsx";
import { navHover, modalHover, btnImgHover, userSettingsSelection, userFormChange, userMenuClick, userPageHover, theClicker, NavStyling, getUserInfo, userMenuSelected, logOut, updateTheData } from "./utils/functions/handlers.js"
import img1 from "./imgs/close.png";
import img2 from "./imgs/close2.png";
import img3 from "./imgs/add.png";
import img4 from "./imgs/add-hover.png";
import { clearNav, scrollAnimation } from "./utils/functions/functions.js";
import styleVars from "./utils/styles/variables.scss";
import axios from "axios";

function App() {
	// variable for location
	const loc = useLocation();
	/***************  Error set up *******************/

	// useState hook for displaying loader component and err component
	const [hide, setHide] = useState({
		display1: "",
		display2: "",
		loader: "",
		err: "none",
	});
	// useState hook for showing different error messages
	const [msg, setMsg] = useState("");

	/***************  Button set up *******************/

	// useState hook for modal close button
	const [img, setImg] = useState({ img: img2, name: 2 });
	// useState hook for setting button image
	const [btnImage, setBtnImage] = useState({ img: img3, imgName: 3 });
	// useState hook for button icon
	const [btnStyle, setBtnStyle] = useState({ display: "none" });

	/***************  Mapbox set up *******************/

	// useState hook for longitudes coordinates
	const [lng, setLng] = useState(-80.185942);
	// useState hook for latitude coordinates
	const [lat, setLat] = useState(25.774772);
	// useState hook for map zoom level
	const [zoom, setZoom] = useState(5);
	// useState hook for location coordinates
	const [locations, setLocations] = useState([
		[-80.128473, 25.781842],
		[-80.647885, 24.909047],
		[-81.0784, 24.707496],
		[-81.768719, 24.552242],
	]);

	/***************  Tour set up *******************/

	// useState hook for all tours data
	const [tours, setTours] = useState([]);
	// useState hook for tour data
	const [myTour, setMyTour] = useState(null);
	// useState hook for tour guides
	const [guides, setGuides] = useState([]);
	// useState hook for tour bg images
	const [bg, setBg] = useState({ img: "", img2: "", img3: "", img4: "" });
	// useState hook for tour page mount
	const [isMountedTourPage, setIsMountedTourPage] = useState(true);
	// useState hook for setting tour reviews
	const [reviews, SetReviews] = useState({});

	/***************  Navbar set up *******************/

	// useState hook for component refrences for observer API
	const [mainRefs, setMainRefs] = useState({
		info: null,
		head: null,
		tour: null,
		rev: null,
		book: null,
		footer: null
	});
	// useState hook for navbar items
	const [navStyle, setNavStyle] = useState({
		backgroundColor: "",
		borderBottom: "",
		boxShadow: "",
		color: "",
		decoration: "underline",
		class: "nav transition",
		displayItems: "",
	});
	const [path, setPath] = useState(window.location.pathname);
	/***************  User settings set up *******************/

	// useState hook for userBorder
	const [userBorder, setUserBorder] = useState("");
	// useState hook for user settings
	const [settings, setSettings] = useState({
		blue: false,
		light: false,
		defaultColor: false,
		default: true,
		purple: false,
		red: false,
		green: false,
		yellow: false,
		dark: false,
		selectionval: "",
		selectionval2: "",
		selectionval3: "",
	});
	// useState hook for changing theme text color
	const [textColor, setTextColor] = useState("");
	// useState hook for changing theme font
	const [font, setFont] = useState("");
	// useState hook for user authentication
	const [auth, setAuth] = useState({
		isLoggedIn: false,
		expired: false,
		saved: false,
		decoded: null
	});
	// useState hook for usermenu styling
	const [userMenu, setUserMenu] = useState({
		menuItem: "",
		menuItem2: "none",
		menuItem3: "none",
		menuItem4: "none",
		menuItem5: "none",
		menuItem6: "none",
		border: {},
		borderColor: "",
		color: "",
		color2: "",
		color3: "",
		color4: "",
		color5: "",
		color6: "",
	});

	/***************  Modal set up *******************/

	// useState hook for displaying modal
	const [modalDis, setModalDis] = useState({
		display: "none",
		open: false,
	});

	/***************  App Pageloyout set up *******************/
	// useState hook for pagelayout
	const [pageLayoutStyle, setPageLayoutStyle] = useState({
		class1: "container page-layout",
		class2: "content-layout",
		overflow: "",
	});
	const [style, setStyle] = useState({ boxShadow: "", border: "" });
	// useState hook for pagelayout styling
	const [layoutDisplay, setLayoutDisplay] = useState({
		display: "",
		backgroundColor: "",
		backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), linear-gradient(to bottom, ${userBorder}, ${userBorder})`,
	});

	// useState for user form styling
	const [userFormStyle, setUserFormStyle] = useState({
		display: "",
		display2: "",
		display3: "none",
		display4: "none",
		modTitle: "",
		btn: "",
	});

	/***************  User input set up *******************/

	// useState hook for retrieving user input
	const [input, setInput] = useState({
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
		passwordCurrent: "",
		photo: "",
		disabled: true,
	});
	// useState hook for setting user data
	const [user, setUser] = useState({
		name: "",
		email: "",
		photo: "",
		role: "",
	});
	// useNavigate hook for redirecting
	const redirect = useNavigate();

	const myClick = theClicker(setAuth, setStyle, setUserBorder, setFont, setTextColor, setPath, redirect, setPageLayoutStyle, setUser, setInput, setHide, setSettings, setModalDis, path, loc, auth, settings, input)

	const threshold = useRef([1, 0.86, 0.14]);
	const styleFont = useRef("");
	const fn1 = () => NavStyling(path, settings, font, styleFont, auth, styleVars, textColor, setUserBorder, setTextColor, setNavStyle);
	const signOut = useRef(logOut(setAuth, setStyle, setUserBorder, setFont, setTextColor, setPath, redirect));

	useEffect(() => {

		const fn = () => clearNav(setNavStyle);
		// Scroll event for navbar animation
		if (path === "/") {
			scrollAnimation(mainRefs, setNavStyle, styleVars);

			document.addEventListener("scroll", fn)
			document.getElementsByTagName("html")[0].className = "";

		}
		if (path !== "/") {
			document.removeEventListener("scroll", fn);
		}

	}, [mainRefs, path])
	// Render app
	return (
		<MyContext.Provider
			value={{
				theUpdater: updateTheData(input, loc, setAuth, setInput, redirect, signOut.current),
				signOut: signOut.current,
				userSelected: userMenuSelected(userBorder, textColor, userMenu, setUserMenu),
				loc,
				getUser: useRef(getUserInfo(axios, loc)),
				NavStyler: fn1,
				styleFont,
				threshold,
				redirect,
				path,
				setPath,
				btnStyle,
				setBtnStyle,
				myTour,
				setMyTour,
				isMountedTourPage,
				setIsMountedTourPage,
				btnImage,
				onHoverBtnImg: btnImgHover(btnImage, setBtnImage, img3, img4),
				userMenuClicker: userMenuClick(setUserMenu, userBorder, textColor),
				hoverEffectUserPage: userPageHover(userMenu, setUserMenu, userBorder, textColor),
				userFormStyle,
				setUserFormStyle,
				reviews,
				SetReviews,
				mapBoxSettings: {
					bg,
					setBg,
					zoom,
					setZoom,
					setLocations,
					lng,
					setLng,
					lat,
					setLat,
					locations,
				},
				onHoverNav: navHover(setNavStyle, userBorder),
				img,
				onHoverModal: modalHover(img, setImg, img1, img2),
				msg,
				setMsg,
				guides,
				setGuides,
				mainRefs,
				setMainRefs,
				navStyle,
				setNavStyle,
				pageLayoutStyle,
				setPageLayoutStyle,
				hide,
				setHide,
				clicker: myClick,
				modalDis,
				setModalDis,
				auth,
				setAuth,
				settings,
				setSettings,
				font,
				setFont,
				userBorder,
				setUserBorder,
				textColor,
				setTextColor,
				layoutDisplay,
				setLayoutDisplay,
				tours,
				setTours,
				userMenu,
				setUserMenu,
				input,
				setInput,
				user,
				setUser,
				onChange: userFormChange(setInput),
				style,
				setStyle,
				selClicker: userSettingsSelection(setSettings, setFont),
			}}
		>
			<Nav />
			<Routes>
				<Route exact path="/" element={<MainPage />} />
				<Route path="/*" element={<PageLayout />}>
					<Route path="about" element={<AboutPage />} />
					<Route path="benefits" element={<BenefitsPage />} />
					<Route path="signup" element={<Signup />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="tours/" element={<ToursPage />} />
					<Route path="tours/*" element={<TourPage />} />
					<Route path="home" element={<UserPage />} />
				</Route>
			</Routes>
		</MyContext.Provider>
	);
}

export default App;
