import { useEffect, useState } from 'react'
import './Header.css';
import HeaderNavButton from './NavButton';
import HeaderButton from './HeaderButton';
import 'material-icons/iconfont/material-icons.css';
import Logo from '../../images/logo.png';
import ProfileVector from '../../images/default_profile_vector.webp';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {

    const [activePage, setActivePage] = useState(null);
    var location = useLocation();
    var navigate = useNavigate();

    useEffect(function () {
        setActivePage(getPageId(location.pathname));
    });

    function navItemClick(id) {
        navigate(id);
    }

    function onSignUpButtonClick() {
        navigate("/signup"); // This will navigate to the SignUp page when the button is clicked
    }
    function onLoginButtonClick() {
        navigate("/login");// This will navigate to the Login page when the button is clicked
    }
    function onNotificationButtonClick() {
        navigate("/notification");
    }

    function onSignOutClick() {
        navigate("/signout");
    }
    function onProfileButtonClick() {
        navigate("/profile");
    }

    return (
        <div className="header">
            <div className="header-top">
                <div className="logo">
                    <img src={Logo} />
                </div>
                <div className="header-right">
                    <>
                        <div className='div-btn' id="login" onClick={onLoginButtonClick}>
                            <button className='signin-button'>Login</button>
                        </div>
                        <div className='div-btn' id="signup" onClick={onSignUpButtonClick}>
                            <button className='signup-button'>Sign Up</button>
                        </div>
                    </>

                    <>
                        <div className='div-btn' id="signout" onClick={onSignOutClick}>
                            <button className='signout-button'>Sign Out</button>
                        </div>
                        <HeaderButton id="notification" activeId={activePage} onClick={onNotificationButtonClick}>
                            <span className="material-icons-outlined">notifications</span>
                        </HeaderButton>

                        <div className="profile" onClick={onProfileButtonClick}>
                            <div className="profile-picture">
                                <img src={ProfileVector} />
                            </div>
                        </div>
                    </>
                </div>
            </div>
            <div className="header-nav">

                <HeaderNavButton id="" activeId={activePage} name="Home" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="about" activeId={activePage} name="About Us" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="predictions" activeId={activePage} name="predictions" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="service" activeId={activePage} name=" h1" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="store" activeId={activePage} name="h2" onClick={(id) => { navItemClick(id) }} />
                <HeaderNavButton id="contact" activeId={activePage} name="Farmers' Q&A" onClick={(id) => { navItemClick(id) }} />

            </div>
        </div>
    );
}

function getPageId(path) {
    path = path.substring(1, path.length);
    const firstIndex = path.indexOf("/");
    if (firstIndex == -1) {
        return path;
    } else {
        return path.substring(0, firstIndex);
    }
}

export default Header;