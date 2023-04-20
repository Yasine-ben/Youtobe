import React from 'react'
import { useHistory } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
    const history = useHistory()


    return (
        <div className="SB-Wrapper">
            <div className='SB-Body'>
                <div className='SB-Home-Subs'>
                    <div className='SB-Home' onClick={history.push('/Home')}>
                        <span id='Home-Icon' class="material-symbols-outlined"> home </span>
                        <p className='SB-Home-Title'>Home</p>
                    </div>
                    <div className='SB-Sub' onClick={''}>
                        <span id='Sub-icon' class="material-symbols-outlined"> subscriptions </span>
                        <p className='SB-Sub-Title'>Subscriptions</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar