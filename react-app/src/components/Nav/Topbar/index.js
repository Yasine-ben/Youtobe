import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../store/session'
import OpenModalButton from '../../OpenModalButton'
import VideoForm from '../../Forms/VideoForm'

import icon from '../../../Images/yt-Icon.png'

import './Topbar.css'
import './Menu.css'


function Topbar() {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    // console.log(sessionUser)

    const openMenu = () => {
        if (showMenu) setShowMenu(false)
        else setShowMenu(true);
    };

    const handleLogout = (e) => {
        dispatch(logout());
        history.push('/')
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <div className='TB-wrapper'>
            <div className='TB-LeftSide-Wrapper'>
                <div className='TB-IconName-Wrapper' onClick={((e) => history.push('/'))}>
                    <img className='TB-Youtobe-Icon' src={icon} alt='Main Icon' />
                    <p className='TB-Title'>Youtobe</p>
                </div>
            </div>
            {/* <div className='TB-Search-Wrapper'>
                <input className='TB-Search-Input' type='text' placeholder='Search' />
                <div className='TB-SearchIcon-Wrapper'>
                    <i className="fa-solid fa-magnifying-glass" id='search-icon' />
                </div>
            </div> */}
            <div className='TB-RightSide-Wrapper'>
                <div className='TB-RightSide-MyLinks-Wrapper'>
                    <a href='https://www.linkedin.com/in/yasine-benzekri-389457271'>
                        <i id='LinkedInIcon' className="fa-brands fa-linkedin"></i>
                    </a>
                    <a href='https://github.com/Yasine-ben'>
                        <i id='GithubIcon' className="fa-brands fa-square-github"></i>
                    </a>
                </div>
                <div ref={ulRef}>
                    {sessionUser
                        ? <div className='TB-LoggedIn-Btn'>
                            <div className='TB-UserImg-Wrapper'>
                                <img src={sessionUser.cover_image} alt='user Img' className='TB-UserImg' onClick={((e) => openMenu())} />
                            </div>
                            {showMenu &&

                                (<div className="TBM">
                                    <div className='TBM-UserInfo-Wrapper'>

                                        <div className='TBM-UserImg-Wrapper-Wrapper'>
                                            <div className='TBM-UserImg-Wrapper'>
                                                <img className='TBM-UserImg' src={sessionUser.cover_image} alt='User-Image' />
                                            </div>
                                        </div>

                                        <div className='TBM-NU-Wrapper'>
                                            <div className='TBM-Name'>{sessionUser.first_name}</div>
                                            <div className='TBM-Username'>{`@${sessionUser.username}`}</div>
                                            <p className='TBM-ManageAccount' onClick={(e) => alert('feature coming soon')}>Manage your Gooo Account</p>
                                        </div>

                                    </div>

                                    <div className='TBM-Manage-Wrapper'>
                                        <div className='TBM-YourVideos-Wrapper' onClick={((e) => history.push('/MyVideos'))}>
                                            <span className="material-symbols-outlined"> account_box </span>
                                            <p className='TBM-YourVideos'>Your Videos</p>
                                        </div>
                                        <div className='TBM-YourVideos-Wrapper' >
                                            <span className="material-symbols-outlined"> publish </span>
                                            <OpenModalButton
                                                className='TBM-UploadVideo'
                                                buttonText='Upload Video'
                                                // onItemClick={''}
                                                modalComponent={<VideoForm />}
                                            />
                                            {/* <p className='TBM-YourVideos'>Upload Video</p> */}
                                        </div>
                                        <div className='TBM-LogOut-Wrapper' onClick={((e) => handleLogout())}>
                                            <span className="material-symbols-outlined"> logout </span>
                                            <p className='TBM-LogOut'>Sign out</p>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>

                        :
                        <div className='TB-NotLoggedInBtn' onClick={((e) => history.push('/login'))}>
                            <span className="material-symbols-outlined">account_circle</span>
                            <p className='TB-NLIB-Title'>Sign in</p>
                        </div>}
                </div>

                {/* <ProfileButton user={sessionUser}/> */}
            </div>
        </div>
    )
}

export default Topbar