import { useState } from 'react';
import './VideoForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function VideoForm() {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [video, setVideo] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [errors, setErrors] = useState({})


    return (
        <div className='VF-Wrapper'>
            <div className='VF-TopBar'>
                <p className='VF-Title'>Video Details</p>
                <span id='VF-X-Symbol' class="material-symbols-outlined"> close </span>
            </div>
            <div className='VF-Video-Details-Wrapper'>
                <div className='VF-VD-Title-Wrapper'>
                    <p className='VF-CD-Title'>Details</p>
                </div>
                <div className='VF-CD-VT-Wrapper'>
                    <input className='VF-CD-VT-Input' type='text' value={title} placeholder='' onChange={(e) => setTitle(e.target.value)} maxLength={100}/>
                    <p className='VF-CD-VT-Title'>Title(required)</p>
                    <p className='VF-CD-VT-Count'>{`${title.length}/100`}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoForm;