import React from 'react'
import icon from '../../../Images/yt-Icon.png'
import './Topbar.css'

function Topbar() {
    return (
        <div className='TB-wrapper'>
            <div className='TB-LeftSide-Wrapper'>
                <i id='TB-Menu' className="fa-solid fa-bars" />
                <div className='TB-IconName-Wrapper' >
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
                <i id='userIcon' class="fa-solid fa-user"></i>
            </div>
        </div>
    )
}

export default Topbar