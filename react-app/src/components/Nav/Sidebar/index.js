import React, { useDebugValue, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Sidebar.css'
import { useSelector } from 'react-redux'

function Sidebar() {
    const history = useHistory()
    const user = useSelector(state => state.session?.user)

    const [menuOpen, setMenuOpen] = useState(true)
    
    useEffect(() => {
        const checkScreenSize = () => {
            if (window.innerWidth <= 750) {
                setMenuOpen(false)
            } else {
                setMenuOpen(true)
            }
        };

        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    useEffect(() => {
        const hpWrapper = document.querySelector('.HP-Wrapper');
        const hpAd = document.querySelector('HP-BlockAdWrapper')

        if (hpWrapper) {
            if (menuOpen) {
                hpWrapper.classList.remove('full-width');
                hpAd?.classList?.remove('full-width')
            } else {
                hpWrapper.classList.add('full-width');
                hpAd?.classList.add('full-width')
            }
        }
    }, [menuOpen]);

    function handleMenu() { setMenuOpen((prevMenuOpen) => !prevMenuOpen); }

    return (
        <>
            <div className={menuOpen ? 'sidebar' : 'sidebar--closed'}>
                <div className="sidebar__link" onClick={() => history.push('/')}>
                    <span id='Home-Icon' className="material-symbols-outlined"> home </span>
                    <span className="sidebar__icon">Home</span>
                </div>

                {user && <div className="sidebar__link" onClick={() => history.push('/Subscriptions')}>
                    <span className="material-symbols-outlined"> subscriptions </span>
                    <span className="sidebar__icon">Subscriptions</span>
                </div>
                }
                {user &&
                    <div className="sidebar__link" onClick={(e) => history.push('/MyVideos')}>
                        <span id='Sub-icon' className="material-symbols-outlined"> video_camera_front </span>
                        <span className="sidebar__icon">Your videos</span>
                    </div>
                }
                {/* <div href="#" className="sidebar__link">
                    <span className="sidebar__icon">Trending</span>
                 </div> */}
                {/* <div href="#" className="sidebar__link">
                <span className="sidebar__icon">Library</span>
                </div> */}
                {/* <div href="#" className="sidebar__link">
                <span className="sidebar__icon">History</span>
                </div> */}
                
            </div>
            <i id='SB-Menu' className="fa-solid fa-bars" onClick={(() => handleMenu())} />
        </>
    );
}

export default Sidebar