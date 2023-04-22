import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../store/session'

import icon from '../../../Images/yt-Icon.png'

import './Topbar.css'
import './Menu.css'


function Topbar() {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    console.log(sessionUser)

    const openMenu = () => {
        if (showMenu) setShowMenu(false)
        else setShowMenu(true);
    };

    const handleLogout = (e) => {
        dispatch(logout());
        history.push('/')
    };

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
                        <i id='userIcon' class="fa-solid fa-user" onClick={((e) => openMenu())} />
                        {showMenu &&

                            <div className="TBM">
                                <div className='TBM-UserInfo-Wrapper'>

                                    <div className='TBM-UserImg-Wrapper-Wrapper'>
                                        <div className='TBM-UserImg-Wrapper'>
                                            <img className='TBM-UserImg' src={sessionUser.cover_image} alt='User-Image' />
                                        </div>
                                    </div>

                                    <div className='TBM-NU-Wrapper'>
                                        <div className='TBM-Name'>{sessionUser.first_name}</div>
                                        <div className='TBM-Username'>{`@${sessionUser.username}`}</div>
                                        <p className='TBM-ManageAccount'>Manage your Gooo Account</p>
                                    </div>

                                </div>

                                <div className='TBM-Manage-Wrapper'>
                                    <div className='TBM-YourVideos-Wrapper' onClick={((e) => history.push('/'))}>
                                        <span class="material-symbols-outlined"> account_box </span>
                                        <p className='TBM-YourVideos'>Your Videos</p>
                                    </div>
                                    <div className='TBM-LogOut-Wrapper' onClick={((e) => handleLogout())}>
                                        <span class="material-symbols-outlined"> logout </span>
                                        <p className='TBM-LogOut'>Sign out</p>
                                    </div>
                                </div>
                            </div>

                        }
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