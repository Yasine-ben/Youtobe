import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Topbar.css'

import icon from '../../../Images/yt-Icon.png'
import { logout } from '../../../store/session'

function Topbar() {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <div className='TB-wrapper'>
            <div className='TB-LeftSide-Wrapper'>
                <i id='TB-Menu' className="fa-solid fa-bars" />
                <div className='TB-IconName-Wrapper' onClick={((e) => history.push('/'))}>
                    <img className='TB-Youtobe-Icon' src={icon} alt='Main Icon' />
                    <p className='TB-Title'>Youtobe</p>
                </div>
            </div>
            <div className='TB-Search-Wrapper'>
                <input className='TB-Search-Input' type='text' placeholder='Search' />
                <div className='TB-SearchIcon-Wrapper'>
                    <i class="fa-solid fa-magnifying-glass" id='search-icon' />
                </div>
            </div>
            <div className='TB-RightSide-Wrapper'>
                
                {sessionUser
                    ? <div className='TB-LoggedIn-Btn'>
                        <i id='userIcon' class="fa-solid fa-user"></i>
                    </div>
                    : <div className='TB-NotLoggedInBtn' onClick={((e) => history.push('/login'))}>
                        <span class="material-symbols-outlined">account_circle</span>
                        <p className='TB-NLIB-Title'>Sign in</p>
                    </div>}

                {/* <ProfileButton user={sessionUser}/> */}
            </div>
        </div>
    )
}

export default Topbar