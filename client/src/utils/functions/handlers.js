/***************  onHandlers set up *******************/
import axios from "axios";
import { useEffect } from "react"; import { decodeToken, isExpired } from "react-jwt";


// onHover handler for switching button images
function btnImgHover(btnImage, setBtnImage, img3, img4) {
    return () => {
        if (btnImage.imgName === 3) setBtnImage({ img: img4, imgName: 4 });
        else setBtnImage({ img: img3, imgName: 3 });
    };
}
// onHover handler for switching modal button images
function modalHover(img, setImg, img1, img2) {
    return () => {
        if (img.name === 2) {
            setImg({ img: img1, name: 1 });
        } else setImg({ img: img2, name: 2 });
    };
}

// onChange handler for user form component
function userFormChange(setInput) {
    return (e, name, photo = null) => {
        // name of event target
        // event target is valid photo
        if (photo && photo.current.files.length > 0) {
            // set photo
            setInput((i) => {
                return { ...i, [name]: photo.current.files[0] };
            });
        }
        // event target is not photo
        else
            // set user input
            setInput((i) => {
                return {
                    ...i,
                    [name]: e.target.value,
                };
            });
    };
}
// onHover handler for navbar
function navHover(setNavStyle, userBorder) {
    return (e) => {
        // event type
        const event = e.type;
        // mouse enter event
        if (event === "mouseenter") {
            // set user color
            setNavStyle((navStyle) => {
                return {
                    ...navStyle,
                    color: userBorder,
                };
            });
        }
        // mouse leave event
        else if (event === "mouseleave") {
            // remove user color
            setNavStyle((navStyle) => {
                return {
                    ...navStyle,
                    color: "inherit",
                };
            });
        }
    };
}
// onClick handler for menu selection color
function userMenuClick(setUserMenu, userBorder, textColor) {
    return (e) => {

        const title = e.target.title;
        // user profile selected
        if (title === "profile") {
            // show user profile
            setUserMenu((s) => {
                return {
                    ...s,
                    menuItem: "",
                    menuItem2: "none",
                    menuItem3: "none",
                    menuItem4: "none",
                    menuItem5: "none",
                    menuItem6: "none",
                    color: userBorder,
                    color2: textColor,
                    color3: textColor,
                    color4: textColor,
                    color5: textColor,
                    color6: textColor,
                };
            });
        }
        // user rewards selected
        else if (title === "rewards") {
            // show user rewards
            setUserMenu((s) => {
                return {
                    ...s,
                    menuItem: "none",
                    menuItem2: "",
                    menuItem3: "none",
                    menuItem4: "none",
                    menuItem5: "none",
                    menuItem6: "none",
                    color: textColor,
                    color2: userBorder,
                    color3: textColor,
                    color4: textColor,
                    color5: textColor,
                    color6: textColor,
                };
            });
        }
        // user bookings selected
        else if (title === "bookings") {
            // show user bookings component
            setUserMenu((s) => {
                return {
                    ...s,
                    menuItem: "none",
                    menuItem2: "none",
                    menuItem3: "",
                    menuItem4: "none",
                    menuItem5: "none",
                    menuItem6: "none",
                    color: textColor,
                    color2: textColor,
                    color3: userBorder,
                    color4: textColor,
                    color5: textColor,
                    color6: textColor,
                };
            });
        }
        // user admin selected tours
        else if (title === "tours") {
            // show admin tours component
            setUserMenu((s) => {
                return {
                    ...s,
                    menuItem: "none",
                    menuItem2: "none",
                    menuItem3: "none",
                    menuItem4: "",
                    menuItem5: "none",
                    menuItem6: "none",
                    color: textColor,
                    color2: textColor,
                    color3: textColor,
                    color4: userBorder,
                    color5: textColor,
                    color6: textColor,
                };
            });
        }
        // user admin selected users
        else if (title === "users") {
            // show admin users component
            setUserMenu((s) => {
                return {
                    ...s,
                    menuItem: "none",
                    menuItem2: "none",
                    menuItem3: "none",
                    menuItem4: "none",
                    menuItem5: "",
                    menuItem6: "none",
                    color: textColor,
                    color2: textColor,
                    color3: textColor,
                    color4: textColor,
                    color5: userBorder,
                    color6: textColor,
                };
            });
        }
        // user selected settings
        else if (title === "settings") {
            // show user settings
            setUserMenu((s) => {
                return {
                    ...s,
                    menuItem: "none",
                    menuItem2: "none",
                    menuItem3: "none",
                    menuItem4: "none",
                    menuItem5: "none",
                    menuItem6: "",
                    color: textColor,
                    color2: textColor,
                    color3: textColor,
                    color4: textColor,
                    color5: textColor,
                    color6: userBorder,
                };
            });
        }
    };
}

// onHover handler for hover effect on user menu
function userPageHover(userMenu, setUserMenu, userBorder, textColor) {
    return (e) => {

        // element title
        const title = e.target.title;
        // event type
        const event = e.type;
        // cursor on profile
        if (title === "profile") {
            // add user color on mouse enter
            if (event === "mouseenter")
                setUserMenu((s) => {
                    return { ...s, color: userBorder };
                });
            // maintain user color while still selected
            else if (event === "mouseleave" && userMenu.menuItem === "")
                setUserMenu((s) => {
                    return { ...s, color: userBorder };
                });
            // remove user color on mouse leave
            else
                setUserMenu((s) => {
                    return { ...s, color: textColor };
                });
        }
        // cursor on rewards
        else if (title === "rewards") {
            // add user color on mouse enter
            if (event === "mouseenter")
                setUserMenu((s) => {
                    return { ...s, color2: userBorder };
                });
            // maintain user color while still selected
            else if (event === "mouseleave" && userMenu.menuItem2 === "")
                setUserMenu((s) => {
                    return { ...s, color2: userBorder };
                });
            // remove user color on mouse leave
            else
                setUserMenu((s) => {
                    return { ...s, color2: textColor };
                });
        }
        // cursor on bookings
        else if (title === "bookings") {
            // add user color on mouse enter
            if (event === "mouseenter")
                setUserMenu((s) => {
                    return { ...s, color3: userBorder };
                });
            // maintain user color while still selected
            else if (event === "mouseleave" && userMenu.menuItem3 === "")
                setUserMenu((s) => {
                    return { ...s, color3: userBorder };
                });
            // remove user color on mouse leave
            else
                setUserMenu((s) => {
                    return { ...s, color3: textColor };
                });
        }
        // cursor on tours
        else if (title === "tours") {
            // add user color on mouse enter
            if (event === "mouseenter")
                setUserMenu((s) => {
                    return { ...s, color4: userBorder };
                });
            // maintain user color while still selected
            else if (event === "mouseleave" && userMenu.menuItem4 === "")
                setUserMenu((s) => {
                    return { ...s, color4: userBorder };
                });
            // remove user color on mouse leave
            else
                setUserMenu((s) => {
                    return { ...s, color4: textColor };
                });
        }
        // cursor on users
        else if (title === "users") {
            // add user color on mouse enter
            if (event === "mouseenter")
                setUserMenu((s) => {
                    return { ...s, color5: userBorder };
                });
            // maintain user color while still selected
            else if (event === "mouseleave" && userMenu.menuItem5 === "")
                setUserMenu((s) => {
                    return { ...s, color5: userBorder };
                });
            // remove user color on mouse leave
            else
                setUserMenu((s) => {
                    return { ...s, color5: textColor };
                });
        }
        // cursor on settings
        else if (title === "settings") {
            // add user color on mouse enter
            if (event === "mouseenter")
                setUserMenu((s) => {
                    return { ...s, color6: userBorder };
                });
            // maintain user color while still selected
            else if (event === "mouseleave" && userMenu.menuItem6 === "")
                setUserMenu((s) => {
                    return { ...s, color6: userBorder };
                });
            // remove user color on mouse leave
            else
                setUserMenu((s) => {
                    return { ...s, color6: textColor };
                });
        }
    };
}
function logOut(
    setAuth,
    setStyle,
    setUserBorder,
    setFont,
    setTextColor,
    setPath,
    redirect
) {

    return () => {
        // set authentication
        setAuth((auth) => {
            return {
                ...auth,
                isLoggedIn: false,
                expired: true,
            };
        });
        // clear any user defined settings
        setStyle((style) => {
            return {
                ...style,
                boxShadow: "",
                borderLeft: "",
                borderRight: "",
            };
        });

        // clear user boder
        setUserBorder("");
        // clear user font
        setFont("");
        // clear user text color
        setTextColor("");
        // set path to homepage
        setPath("/");
        // redirect to homepage
        redirect("/", { replace: true });
    }

}
function updateTheData(input, loc, setAuth, setInput, redirect, signOut) {

    return async (e) => {
        const title = e.target.id;
        if (title === "user-profile") {

            // Check if the button text is save
            // Check if inputs are not empty and not the same user info already saved
            if (e.target.outerText === "Save" && IsUserInputsGood(input, loc.state)) {
                const { formData, userPW } = getFormData(input);

                try {
                    // variable for response
                    let res = null;
                    // user password was updated
                    if (userPW["password"]) {

                        // Update user password
                        await updateUserData("password", userPW);

                    }
                    // update user data
                    res = await updateUserData("user", formData)

                    const { photo, name, email, userSettings } = res.data.user;
                    redirect("/home", { state: { ...loc.state, name, email, photo, userSettings } })
                    loc.state = { ...loc.state, name, email }

                } catch (err) {

                    if (
                        err.response &&
                        err.response.status.toString().startsWith("4")
                    ) {
                        signOut();
                    } else {
                        // show err message
                        setAuth((s) => {
                            return { ...s, expired: err.response.data.message };
                        });
                        console.log("What an err: " + err);
                    }
                }
            }
            // Toggle edit user
            setInput((i) => {

                return {
                    disabled: !i.disabled,
                };
            });
        }
    }

}
// onClick handler
function theClicker(
    setAuth,
    setStyle,
    setUserBorder,
    setFont,
    setTextColor,
    setPath,
    redirect,
    setPageLayoutStyle,
    setUser,
    setInput,
    setHide,
    setSettings,
    setModalDis,
    path,
    loc,
    auth,
    settings,
    input
) {
    return async (e, tourInfo = null) => {
        // element title
        const title = e.target.id;
        e.preventDefault();
        const signOut = logOut(
            setAuth,
            setStyle,
            setUserBorder,
            setFont,
            setTextColor,
            setPath,
            redirect
        );

        // user clicked log out button
        if (title === "logOut") {
            signOut();

        }
        // user clicked on more tours button
        if (title === "tours") {
            // set path to tours page
            setPath("/tours");
            redirect("/tours");
        }
        // user clicked on info component button
        if (title === "learn-more-btn") {
            // set path to about us page
            setPath("/about");
            redirect("/about")
        }
        // user clicked the book now component button
        if (title === "bookNow" || title === "benefits") {
            // set path to signup page
            setPath("/signup");
            // redirect to signup page with user input
            title === "bookNow" ?
                redirect("/signup", {
                    state: { name: input.name, email: input.email },
                    replace: true,
                }) : redirect("/signup");
        }

        if (title.startsWith("the-")) {

            setPath(`/tours/${e.target.id}`);
            redirect("/tours/" + e.target.id, { state: { ...tourInfo } })
        }

        // Check if the click event was triggered in user profile

        // user settings clicked
        else if (title === "settings") {
            const userSettings = {};
            for (let prop in settings) {
                if (settings[prop]) userSettings[prop] = settings[prop];
            }
            try {

                // update user settings
                await updateUserData("user", { userSettings });

            } catch (err) {
                console.log(err);
            }
            redirect("/home", { state: { ...loc.state, userSettings } });
        }

        // sign up component btn clicked
        else if (path === "/signup" && title !== "book") {
            try {
                // sign up with user input
                await signUpUser(input);
                // reset user input
                setInput((i) => {
                    return {
                        ...i,
                        name: "",
                        email: "",
                        password: "",
                        passwordConfirm: "",
                    };
                });
                // clear any err messages
                if (auth.expired || !auth.err) {
                    setHide((h) => {
                        return { ...h, err: "none" };
                    });
                    setAuth((a) => {
                        return { ...a, expired: "" };
                    });
                }
                setPath("/login");
                // redirect to login page
                redirect("/login", { replace: true });
            } catch (err) {
                // show err message
                setHide((h) => {
                    return { ...h, err: "" };
                });
                // send error info
                setAuth((s) => {
                    return { ...s, expired: err.response.data.message };
                });
            }
        }
        // on login page
        else if (path === "/login") {
            let res = null;

            try {
                // logging in user
                res = await loginUser(input);

                setAuth((s) => {
                    return {
                        ...s,
                        isLoggedIn: true,
                    };
                });
                // reset user input
                setInput((i) => {
                    return {
                        ...i,
                        name: "",
                        email: "",
                        password: "",
                        passwordConfirm: "",
                    };
                });
                // any saved user settings
                if (res.data.user.userSettings) {
                    // set user settings
                    setSettings((s) => {
                        return { ...s, ...res.data.user.userSettings };
                    });
                    // any saved font not default
                    if (res.data.user.userSettings.default !== true)
                        setFont(res.data.user.userSettings.default);
                }

                // set user data
                setUser({
                    name: res.data.user.name,
                    email: res.data.user.email,
                    photo: res.data.user.photo,
                    role: res.data.user.role,
                });
                const myToken = decodeToken(res.data.token);
                const expiration = new Date(myToken.exp * 1000);

                setTimeout(() => {
                    if (isExpired(myToken)) {

                        signOut();
                    }
                }, expiration - Date.now())
                setPath("/home");
                // redirect to user homepage
                redirect("/home", {
                    state: {
                        id: res.data.user._id,
                        name: res.data.user.name,
                        email: res.data.user.email,
                        photo: res.data.user.photo,
                        role: res.data.user.role,
                        timeLimit: expiration,
                        userSettings: res.data.user.userSettings,
                    },
                    replace: true,
                });
                if (auth.expired)
                    // hide any input errors
                    setHide((h) => {
                        return { ...h, err: "none" };
                    });
            } catch (err) {
                // send error info
                setAuth((s) => {
                    return { ...s, expired: err.response.data.message };
                });
                // show error message
                setHide((h) => {
                    return { ...h, err: "" };
                });
            }
        }
        // modal was clicked open
        else if (title === "#openModal") {

            // set display modal
            setModalDis({ display: "", open: true });
            // set overflow hidden on layout
            setPageLayoutStyle((s) => {
                return {
                    ...s,
                    overflow: "hidden",
                };
            });
        }
        // modal was clicked closed
        else if (title === "close") {

            // set default overflow on layout
            setPageLayoutStyle((s) => {
                return {
                    ...s,
                    overflow: "",
                };
            });
            // hide modal
            setModalDis({ display: "none", open: false });
        }
    };
}
function userMenuSelected(userBorder, textColor, userMenu, setUserMenu) {
    return () => {
        let selected = null;

        for (let prop in userMenu) {
            if (prop.includes("Item") && userMenu[prop] !== "none") {
                selected = prop;
            }

        }
        if (userBorder !== userMenu[selected]) {
            setUserMenu((s) => {
                for (let prop in s) {
                    if (prop.includes("Item") && prop !== selected) s[prop] = textColor;
                    if (prop.includes("Item") && prop === selected) s[prop] = userBorder;
                }
            });
        }



    }
}

function IsUserInputsGood(input, user) {
    let areGood = true

    if ((input.name !== user.name && input.email !== user.email) || (input.passwordCurrent && input.password === input.passwordConfirm)) {
        areGood = true;
    }

    return areGood;
}
async function loginUser(data) {
    return await axios.post("api/v1/users/login", {
        email: data.email,
        password: data.password,
    });
}
function getUserInfo(axios, loc) {
    return async () => await axios.get("api/v1/users/id/" + loc.state.id)

}
async function signUpUser(data) {
    const { name, email, password, passwordConfirm } = data;
    // signing up new user
    await axios.post("api/v1/users/signup", {
        name,
        email,
        password,
        passwordConfirm,
    });
}
async function updateUserData(type, data) {
    if (type === "password") {
        return await axios.patch(`api/v1/users/updatePassword`, data);
    } else if (type === "user") {
        return await axios.patch(`api/v1/users/updateMe`, data);

    }
}
function getFormData(input) {
    const userPW = {};
    let formData = new FormData();
    // Organize form data
    Object.keys(input).forEach((prop) => {
        if (prop.includes("password")) userPW[prop] = input[prop];
        else if (input[prop]) {
            if (prop === "photo") {
                formData.append(prop, input[prop], input[prop].name);
            } else formData.append(prop, input[prop]);
        }
    });

    return { formData, userPW };
}
// onClick handler for user settings selection
function userSettingsSelection(setSettings, setFont) {

    return (e) => {
        const title = e.target.value;

        // user selected the dark option
        if (title === "dark") {
            setSettings((s) => {
                return {
                    ...s,
                    light: false,
                    dark: true,
                    selectionval3: e.target.value,
                };
            });
        }
        // user selected the light option
        if (title === "light") {
            setSettings((s) => {
                return {
                    ...s,
                    light: true,
                    dark: false,
                    selectionval3: e.target.value,
                };
            });
        }
        // user selected color blue
        if (title === "blue") {

            setSettings((s) => {
                return {
                    ...s,
                    blue: true,
                    defaultColor: false,
                    purple: false,
                    red: false,
                    green: false,
                    yellow: false,
                    grey: false,
                    selectionval: e.target.value,
                };
            });
        }
        // user selected color default
        else if (title === "defaultColor") {
            setSettings((s) => {
                return {
                    ...s,
                    blue: false,
                    defaultColor: true,
                    purple: false,
                    red: false,
                    green: false,
                    yellow: false,
                    grey: false,
                    selectionval: e.target.value,
                };
            });
        }
        // user selected color purple
        if (title === "purple") {
            setSettings((s) => {
                return {
                    ...s,
                    blue: false,
                    defaultColor: false,
                    purple: true,
                    red: false,
                    green: false,
                    yellow: false,
                    grey: false,
                    selectionval: e.target.value,
                };
            });
        }
        // user selected color red
        if (title === "red") {
            setSettings((s) => {
                return {
                    ...s,
                    blue: false,
                    defaultColor: false,
                    purple: false,
                    red: true,
                    green: false,
                    yellow: false,
                    grey: false,
                    selectionval: e.target.value,
                };
            });
        }
        // user selected color green
        if (title === "green") {
            setSettings((s) => {
                return {
                    ...s,
                    blue: false,
                    defaultColor: false,
                    purple: false,
                    red: false,
                    green: true,
                    yellow: false,
                    grey: false,
                    selectionval: e.target.value,
                };
            });
        }
        // user selected color yellow
        if (title === "yellow") {

            setSettings((s) => {
                return {
                    ...s,
                    blue: false,
                    defaultColor: false,
                    purple: false,
                    red: false,
                    green: false,
                    yellow: true,
                    grey: false,
                    selectionval: e.target.value,
                };
            });
        }
        // user selected color grey
        if (title === "grey") {

            setSettings((s) => {
                return {
                    ...s,
                    blue: false,
                    defaultColor: false,
                    purple: false,
                    red: false,
                    green: false,
                    yellow: false,
                    grey: true,
                    selectionval: e.target.value,
                };
            });
        }
        // user selected font smooth
        if (title === "smooth") {
            setFont("aviano-future");
            setSettings((s) => {
                return {
                    ...s,
                    default: "aviano-future",
                    selectionval2: e.target.value,
                };
            });
        }
        // user selected font default
        if (title === "default") {
            setFont("");
            setSettings((s) => {
                return {
                    ...s,
                    default: true,
                    selectionval2: e.target.value,
                };
            });
        }
        // user selected font touristico
        if (title === "touristico") {
            setFont("bookmania");
            setSettings((s) => {
                return {
                    ...s,
                    default: "bookmania",
                    selectionval2: e.target.value,
                };
            });
        }
    };
}

function NavStyling(
    path,
    settings,
    font,
    styleFont,
    auth,
    styleVars,
    textColor,
    setUserBorder,
    setTextColor,
    setNavStyle
) {
    return useEffect(() => {
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
                    class: "nav transition",
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
            userScrollStyle(1)
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
                userScrollStyle(2)
                setUserBorder(`${styleVars.color6}`);
                setNavStyle((style) => {
                    return {
                        ...style,
                        color: textColor,
                        borderBottom: `4px solid ${styleVars.color6}`,
                        boxShadow: `0 0 2rem ${styleVars.color6}`,
                    };
                });
            }
            // user saved color settings purple
            else if (settings.purple) {
                userScrollStyle(3)
                setUserBorder(`${styleVars.color7}`);
                setNavStyle((style) => {
                    return {
                        ...style,
                        color: textColor,
                        borderBottom: `4px solid ${styleVars.color7}`,
                        boxShadow: `0 0 2rem ${styleVars.color7}`,
                    };
                });
            }
            // user saved color settings yellow
            else if (settings.yellow) {
                userScrollStyle(4)
                setUserBorder(`${styleVars.color8}`);
                setNavStyle((style) => {
                    return {
                        ...style,
                        color: textColor,
                        borderBottom: `4px solid ${styleVars.color8}`,
                        boxShadow: `0 0 2rem ${styleVars.color8}`,
                    };
                });
            }
            // user saved color settings red
            else if (settings.red) {
                userScrollStyle(5)
                setUserBorder(`${styleVars.color9}`);
                setNavStyle((style) => {
                    return {
                        ...style,
                        color: textColor,
                        borderBottom: `4px solid ${styleVars.color9}`,
                        boxShadow: `0 0 2rem ${styleVars.color9}`,
                    };
                });
            }
            // user saved color settings green
            else if (settings.green) {
                userScrollStyle(6)
                setUserBorder(`${styleVars.color10}`);
                setNavStyle((style) => {
                    return {
                        ...style,
                        color: textColor,
                        borderBottom: `4px solid ${styleVars.color10}`,
                        boxShadow: `0 0 2rem ${styleVars.color10}`,
                    };
                });
            }
            // user saved color settings grey
            else if (settings.grey) {
                userScrollStyle(7)
                setUserBorder(`${styleVars.color11}`);
                setNavStyle((style) => {
                    return {
                        ...style,
                        color: textColor,
                        borderBottom: `4px solid ${styleVars.color11}`,
                        boxShadow: `0 0 2rem ${styleVars.color11}`,
                    };
                });
            }
            // user saved color settings default
            else if (settings.defaultColor) {
                userScrollStyle(1)
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
                        class: "nav transition light",
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
                        class: "nav tranistion",
                    };
                });
            }
        } else if (!auth.isLoggedIn && path === "/home") {
            // refresh from login
            setNavStyle((style) => {
                return {
                    ...style,
                    borderBottom: `4px solid ${styleVars.color5}`,
                    boxShadow: `0 0 2rem ${styleVars.color5}`,
                };
            });
        } else if (!auth.isLoggedIn && path === "/") {
            // refresh from login
            setNavStyle((style) => {
                return {
                    backgroundColor: "",
                    borderBottom: "",
                    boxShadow: "",
                    color: "",
                    decoration: "underline",
                    class: "nav tranistion",
                    displayItems: "",
                };
            });
        }
    }, [
        path,
        settings,
        font,
        styleFont,
        auth,
        styleVars,
        textColor,
        setUserBorder,
        setTextColor,
        setNavStyle,
    ]);
}
function userScrollStyle(num) {
    const htmlDoc = document.getElementsByTagName("html")[0];
    htmlDoc.className = `userColor-${num}`
}

export {
    NavStyling,
    modalHover,
    btnImgHover,
    userSettingsSelection,
    theClicker,
    navHover,
    userPageHover,
    userMenuClick,
    userFormChange,
    getUserInfo,
    logOut,
    userMenuSelected,
    updateTheData
};
