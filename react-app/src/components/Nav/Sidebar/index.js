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
                <a href="#" className="sidebar__link">
                    <span className="sidebar__icon">Home</span>
                </a>
                <a href="#" className="sidebar__link">
                    <span className="sidebar__icon">Trending</span>
                </a>
                <a href="#" className="sidebar__link">
                    <span className="sidebar__icon">Subscriptions</span>
                </a>
                <hr className="sidebar__separator" />
                {/* <a href="#" className="sidebar__link">
                <span className="sidebar__icon">Library</span>
            </a> */}
                {/* <a href="#" className="sidebar__link">
                <span className="sidebar__icon">History</span>
            </a> */}
                <a href="#" className="sidebar__link">
                    <span className="sidebar__icon">Your videos</span>
                </a>
                <a href="#" className="sidebar__link">
                    <span className="sidebar__icon">Liked videos</span>
                </a>
                <hr className="sidebar__separator" />
                <a href="#" className="sidebar__link">
                    <span className="sidebar__icon">Subscriptions</span>
                </a>
            </div>
            <i id='SB-Menu' className="fa-solid fa-bars" onClick={(() => handleMenu())} />
        </>
    );
}

export default Sidebar