import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import UpdateVideoForm from "../../Forms/UpdateVideoForm";
import './ToolTipMenu.css';
import { thunkDeleteVideo } from "../../../store/video";
import OpenModalButton from "../../OpenModalButton";

function ToolTipMenu({ video, setMenuOpen, menuOpen }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const menuRef = useRef(null); // Ref for the menu itself
    const userId = useSelector(state => state.session.user?.id);
    const videoId = video.id;

    const [areYouSure, setAreYouSure] = useState(false)

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

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(thunkDeleteVideo(video.id))
        history.push('/')
    }

    const handleAreYouSure = () => {
        setAreYouSure(true)
    }
    return (
        <div className="TT-Menu-Wrapper" ref={menuRef}>
            <div className="TT-Options-Wrapper" style={{ display: menuOpen ? 'flex' : 'none' }}>

                <div className="TT-Option-Container" onClick={() => setMenuOpen(false)}>
                    {/* create playlist and redirect user to that new playlist */}

                    <OpenModalButton
                        className='TT-Option'
                        buttonText='Update'
                        modalComponent={<UpdateVideoForm video_id={video.id} />}
                    />

                </div>


                <div className="TT-Option-Container">
                    {/* open extra menu with all user playlists */}
                    {!areYouSure ?
                        <div className="TT-Option" onClick={(e) => handleAreYouSure(e)}>
                            Delete
                        </div> :
                        <div className="TT-Option" onClick={(e) => handleDelete(e)} style={{ color: 'red' }}>
                            Are You Sure?
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ToolTipMenu;
