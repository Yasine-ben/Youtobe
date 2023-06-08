import React, { useDebugValue, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
    const history = useHistory()
    const [menuOpen, setMenuOpen] = useState(true)
    // return (
    //     <div className="SB-Wrapper">
    //         <div className='SB-Body'>
    //             <div className='SB-Home-Subs'>
    //                 <div className='SB-Home' onClick={history.push('/')}>
    //                     <span id='Home-Icon' className="material-symbols-outlined"> home </span>
    //                     <p className='SB-Home-Title'>Home</p>
    //                 </div>
    //                 <div className='SB-Sub' onClick={(e)=> history.push('/MyVideos')}>
    //                     <span id='Sub-icon' className="material-symbols-outlined"> subscriptions </span>
    //                     <p className='SB-Sub-Title'>My Videos</p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )
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

        if (hpWrapper) {
            if (menuOpen) {
                hpWrapper.classList.remove('full-width');
            } else {
                hpWrapper.classList.add('full-width');
            }
        }
    }, [menuOpen]);

    function handleMenu() {
        setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    }

    return (
        <>
            <div className={menuOpen ? 'sidebar' : 'sidebar--closed'}>
                <div className="sidebar__link" onClick={history.push('/')}>
                    <span id='Home-Icon' className="material-symbols-outlined"> home </span>
                    <span className="sidebar__icon">Home</span>
                </div>

                <div  className="sidebar__link">
                    <span class="material-symbols-outlined"> subscriptions </span>
                    <span className="sidebar__icon">Subscriptions</span>
                </div>
                <hr className="sidebar__separator" />                
                {/* <div href="#" className="sidebar__link">
                    <span className="sidebar__icon">Trending</span>
                 </div> */}
                {/* <div href="#" className="sidebar__link">
                <span className="sidebar__icon">Library</span>
                </div> */}
                {/* <div href="#" className="sidebar__link">
                <span className="sidebar__icon">History</span>
                </div> */}
                <div className="sidebar__link" onClick={(e)=> history.push('/MyVideos')}>
                    <span id='Sub-icon' className="material-symbols-outlined"> video_camera_front </span>
                    <span className="sidebar__icon">Your videos</span>
                </div>
                <div className="sidebar__link">
                    <span class="material-symbols-outlined"> favorite </span>
                    <span className="sidebar__icon">Liked videos</span>
                </div>
            </div>
            <i id='SB-Menu' className="fa-solid fa-bars" onClick={(() => handleMenu())} />
        </>
    );
}

export default Sidebar