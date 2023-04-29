import React from 'react'
import { useHistory } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
    const history = useHistory()


    return (
        <div className="SB-Wrapper">
            <div className='SB-Body'>
                <div className='SB-Home-Subs'>
                    <div className='SB-Home' onClick={history.push('/')}>
                        <span id='Home-Icon' className="material-symbols-outlined"> home </span>
                        <p className='SB-Home-Title'>Home</p>
                    </div>
                    <div className='SB-Sub' onClick={(e)=> alert('Feature coming soon')}>
                        <span id='Sub-icon' className="material-symbols-outlined"> subscriptions </span>
                        <p className='SB-Sub-Title'>Subscriptions</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar