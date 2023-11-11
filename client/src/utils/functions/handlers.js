/***************  onHandlers set up *******************/
import axios from "axios";
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
    return (e, photo = null) => {
        // name of event target
        const name = e.target.name;
        // event target is valid photo
        if (name === 'photo' && photo.current.files.length > 0) {
            // set photo
            setInput((i) => {
                return { ...i, photo: photo.current.files[0] };
            });
        }
        // event target is not photo
        else if (name !== '')
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
        if (event === 'mouseenter') {
            // set user color
            setNavStyle((navStyle) => {
                return {
                    ...navStyle,
                    color: userBorder,
                };
            });
        }
        // mouse leave event
        else if (event === 'mouseleave') {
            // remove user color
            setNavStyle((navStyle) => {
                return {
                    ...navStyle,
                    color: 'inherit',
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
        if (title === 'profile') {
            // show user profile
            setUserMenu((s) => {
                return {
                    ...s,
                    menuItem: '',
                    menuItem2: 'none',
                    menuItem3: 'none',
                    menuItem4: 'none',
                    menuItem5: 'none',
                    menuItem6: 'none',
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
        else if (title === 'rewards') {
            // show user rewards
            setUserMenu((s) => {
                return {
                    ...s,
                    menuItem: 'none',
                    menuItem2: '',
                    menuItem3: 'none',
                    menuItem4: 'none',
                    menuItem5: 'none',
                    menuItem6: 'none',
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
        else if (title === 'bookings') {
            // show user bookings component
            setUserMenu((s) => {
                return {
                    ...s,
                    menuItem: 'none',
                    menuItem2: 'none',
                    menuItem3: '',
                    menuItem4: 'none',
                    menuItem5: 'none',
                    menuItem6: 'none',
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
        else if (title === 'tours') {
            // show admin tours component
            setUserMenu((s) => {
                return {
                    ...s,
                    menuItem: 'none',
                    menuItem2: 'none',
                    menuItem3: 'none',
                    menuItem4: '',
                    menuItem5: 'none',
                    menuItem6: 'none',
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
        else if (title === 'users') {
            // show admin users component
            setUserMenu((s) => {
                return {
                    ...s,
                    menuItem: 'none',
                    menuItem2: 'none',
                    menuItem3: 'none',
                    menuItem4: 'none',
                    menuItem5: '',
                    menuItem6: 'none',
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
        else if (title === 'settings') {
            // show user settings
            setUserMenu((s) => {
                return {
                    ...s,
                    menuItem: 'none',
                    menuItem2: 'none',
                    menuItem3: 'none',
                    menuItem4: 'none',
                    menuItem5: 'none',
                    menuItem6: '',
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
        if (title === 'profile') {
            // add user color on mouse enter
            if (event === 'mouseenter')
                setUserMenu((s) => {
                    return { ...s, color: userBorder };
                });
            // maintain user color while still selected
            else if (event === 'mouseleave' && userMenu.menuItem === '')
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
        else if (title === 'rewards') {
            // add user color on mouse enter
            if (event === 'mouseenter')
                setUserMenu((s) => {
                    return { ...s, color2: userBorder };
                });
            // maintain user color while still selected
            else if (event === 'mouseleave' && userMenu.menuItem2 === '')
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
        else if (title === 'bookings') {
            // add user color on mouse enter
            if (event === 'mouseenter')
                setUserMenu((s) => {
                    return { ...s, color3: userBorder };
                });
            // maintain user color while still selected
            else if (event === 'mouseleave' && userMenu.menuItem3 === '')
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
        else if (title === 'tours') {
            // add user color on mouse enter
            if (event === 'mouseenter')
                setUserMenu((s) => {
                    return { ...s, color4: userBorder };
                });
            // maintain user color while still selected
            else if (event === 'mouseleave' && userMenu.menuItem4 === '')
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
        else if (title === 'users') {
            // add user color on mouse enter
            if (event === 'mouseenter')
                setUserMenu((s) => {
                    return { ...s, color5: userBorder };
                });
            // maintain user color while still selected
            else if (event === 'mouseleave' && userMenu.menuItem5 === '')
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
        else if (title === 'settings') {
            // add user color on mouse enter
            if (event === 'mouseenter')
                setUserMenu((s) => {
                    return { ...s, color6: userBorder };
                });
            // maintain user color while still selected
            else if (event === 'mouseleave' && userMenu.menuItem6 === '')
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

// onClick handler
function theClicker(setAuth, setStyle, setUserBorder, setFont, setTextColor, setPath, redirect, setPageLayoutStyle, setUser, setInput, setHide, setSettings, setModalDis, isExpired, path, loc, auth, settings, input) {
    return async (e) => {
        // element title
        const title = e.target.title;
        e.preventDefault();

        // user clicked log out button
        if (title === 'logOut') {
            // set authentication
            setAuth((auth) => {
                return {
                    ...auth,
                    isLoggedIn: false,
                    expired: true,
                    jwt: '',
                };
            });
            // clear any user defined settings
            setStyle((style) => {
                return {
                    ...style,
                    boxShadow: '',
                    borderLeft: '',
                    borderRight: '',
                };
            });

            // clear user boder
            setUserBorder('');
            // clear user font
            setFont('');
            // clear user text color
            setTextColor('');
            // set path to homepage
            setPath('/');
            // redirect to homepage
            redirect('/', { replace: true });
        }
        // user clicked on more tours button
        if (title === 'tours') {
            // set path to tours page
            setPath('/tours');
        }
        // user clicked on info component button
        if (title === '/about') {
            // set path to about us page
            setPath('/about');
        }
        // user clicked the book now component button
        if (title === 'book') {
            // set path to signup page
            setPath('/signup');
            // redirect to signup page with user input
            redirect('/signup', {
                state: { name: input.name, email: input.email },
                // replace: true,
            });
        }

        // Check if the click event was triggered in user profile
        if (title === 'user-profile') {
            // Check if the button text is save
            if (e.target.outerText === 'Save') {

                // Check if inputs are not empty and not the same user info already saved
                if (IsUserInputsGood(input)) {
                    const { formData, userPW } = getFormData(input);
                    try {
                        // user passwird was updated
                        if (userPW['password']) {
                            // Update user password
                            updateUserData("password", userPW);
                        }
                        // variable for response
                        let res = null;
                        // update user data
                        res = updateUserData("user", formData);
                        // response has user photo
                        if (res.data.photo)
                            // set user photo
                            setUser((u) => {
                                return {
                                    ...u,
                                    photo: res.data.photo,
                                };
                            });

                        // clear any err meassages
                        setAuth((s) => {
                            return {
                                ...s,
                                isLoggedIn: true,
                                expired: false,
                            };
                        });
                    } catch (err) {
                        // show err message
                        setAuth((s) => {
                            return { ...s, expired: err.response.data.message };
                        });
                    }
                }
            }
            // Toggle edit user
            setInput((i) => {
                return {
                    ...i,
                    disabled: !i.disabled,
                };
            });
        }
        // user settings clicked
        if (title === 'settings') {
            const userSettings = {};
            for (let prop in settings) {
                if (settings[prop]) userSettings[prop] = settings[prop];
            }
            try {
                // update user settings
                updateUserData("user", userSettings);
            } catch (err) {
                console.log(err);
            }

            redirect('/home', { state: { ...loc.state, userSettings } });
        }

        // sign up component btn clicked
        if (path === '/signup' && title !== '/signup' && title !== 'book') {
            try {
                // destructuring user input
                signUpUser(input);
                // reset user input
                setInput((i) => {
                    return {
                        ...i,
                        name: '',
                        email: '',
                        password: '',
                        passwordConfirm: '',
                    };
                });
                // clear any err messages
                if (auth.expired || !auth.err) {
                    console.log('nothere');
                    setHide((h) => {
                        return { ...h, err: 'none' };
                    });
                    setAuth((a) => {
                        return { ...a, expired: '' };
                    });
                }
                setPath('/login');
                // redirect to login page
                redirect('/login', { replace: true });
            } catch (err) {
                // show err message
                setHide((h) => {
                    return { ...h, err: '' };
                });
                // send error info
                setAuth((s) => {
                    return { ...s, expired: err.response.data.message };
                });
            }
        }
        // on login page
        else if (path === '/login') {
            let res = null;
            try {
                // logging in user
                res = loginUser(input);
                setAuth((s) => {
                    return {
                        ...s,
                        isLoggedIn: true,
                        jwt: res.data.token,
                        expired: isExpired(res.data.token),
                    };
                });
                // reset user input
                setInput((i) => {
                    return {
                        ...i,
                        name: '',
                        email: '',
                        password: '',
                        passwordConfirm: '',
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

                setPath('/home');
                // redirect to user homepage
                redirect('/home', {
                    state: {
                        name: res.data.user.name,
                        email: res.data.user.email,
                        photo: res.data.user.photo,
                        role: res.data.user.role,
                        jwt: res.data.token,
                        userSettings: res.data.user.userSettings,
                        expired: isExpired(res.data.token),
                    },
                    replace: true,
                });
                if (auth.expired)
                    // hide any input errors
                    setHide((h) => {
                        return { ...h, err: 'none' };
                    });
            } catch (err) {
                // send error info
                setAuth((s) => {
                    return { ...s, expired: err.response.data.message };
                });
                // show error message
                setHide((h) => {
                    return { ...h, err: '' };
                });
            }
        }
        // modal was clicked open
        else if (title === '#openModal') {
            // set display modal
            setModalDis({ display: '', open: true });
            // set overflow hidden on layout
            setPageLayoutStyle((s) => {
                return {
                    ...s,
                    overflow: 'hidden',
                };
            });
        }
        // modal was clicked closed
        else if (title === 'close') {
            // set default overflow on layout
            setPageLayoutStyle((s) => {
                return {
                    ...s,
                    overflow: '',
                };
            });
            // hide modal
            setModalDis({ display: 'none', open: false });
        }
    };

}

function IsUserInputsGood(input, user) {
    let areGood = false;

    if (
        (input.name !== '' && input.email !== '') ||
        (input.currentPassword !== '' &&
            input.password !== '' &&
            input.passwordConfirm !== '') ||
        input.photo !== ''
    ) {
        if (input.name !== user.name && input.email !== user.email) {

            areGood = true;
        }
    }
    return areGood;
}
async function loginUser(data) {

    return await axios.post('api/v1/users/login', {
        email: data.email,
        password: data.password,
    });
}
async function signUpUser(data) {
    const { name, email, password, passwordConfirm } = data;
    // signing up new user
    await axios.post('api/v1/users/signup', {
        name,
        email,
        password,
        passwordConfirm,
    });
}
async function updateUserData(type, data) {
    let response = null;
    if (type === "password") {
        await axios.patch(`api/v1/users/updatePassword`, data);
    }
    else if (type === "user") {
        response = await axios.patch(`api/v1/users/updateMe`, data);
    }
    return response;
}
function getFormData(input) {
    const pws = {};
    let fd = new FormData();
    // Organize form data
    Object.keys(input).forEach((prop) => {
        if (prop.includes('password')) pws[prop] = input[prop];
        else if (input[prop]) {
            if (prop === 'photo') {
                fd.append(prop, input[prop], input[prop].name);
            } else fd.append(prop, input[prop]);
        }
    });

    return { fd, pws }
}
// onClick handler for user settings selection
function userSettingsSelection(setSettings, setFont) {
    return (e) => {
        const title = e.target.value;
        // user selected the dark option
        if (title === 'dark') {
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
        if (title === 'light') {
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
        if (title === 'blue') {
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
        else if (title === 'defaultColor') {
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
        if (title === 'purple') {
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
        if (title === 'red') {
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
        if (title === 'green') {
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
        if (title === 'yellow') {
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
        if (title === 'grey') {
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
        if (title === 'smooth') {
            setFont('aviano-future');
            setSettings((s) => {
                return {
                    ...s,
                    default: 'aviano-future',
                    selectionval2: e.target.value,
                };
            });
        }
        // user selected font default
        if (title === 'default') {
            setFont('');
            setSettings((s) => {
                return {
                    ...s,
                    default: true,
                    selectionval2: e.target.value,
                };
            });
        }
        // user selected font touristico
        if (title === 'touristico') {
            setFont('bookmania');
            setSettings((s) => {
                return {
                    ...s,
                    default: 'bookmania',
                    selectionval2: e.target.value,
                };
            });
        }
    };
}

export { modalHover, btnImgHover, userSettingsSelection, theClicker, navHover, userPageHover, userMenuClick, userFormChange }