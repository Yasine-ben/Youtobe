import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import './ToolTipMenu.css';

function ToolTipMenu({ video, setMenuOpen, menuOpen }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const menuRef = useRef(null); // Ref for the menu itself
    const userId = useSelector(state => state.session.user?.id);
    const videoId = video.id;

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, [setMenuOpen, userId]);


    return (
        <div className="TT-Menu-Wrapper" ref={menuRef}>
            <div className="TT-Options-Wrapper" style={{ display: menuOpen ? 'flex' : 'none' }}>
                <div className="TT-Option-Container">
                    {/* create playlist and redirect user to that new playlist */}
                    <div className="TT-Option" o>
                        Update
                    </div>
                </div>
                <div className="TT-Option-Container">
                    {/* open extra menu with all user playlists */}
                    <div className="TT-Option" >
                        Delete
                    </div>
                </div>
                <div className="TT-Option-Container">
                    {/* dispatch add to queue thunk */}
                    <div className="TT-Option" >
                        Add to queue
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToolTipMenu;
