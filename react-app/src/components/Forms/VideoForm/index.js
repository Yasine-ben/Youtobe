import { useState } from 'react';
import './VideoForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';

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
            <div className='VF-Left-Wrapper'>
                <div className='VF-TopBar'>
                    <p className='VF-Title'>Video Details</p>
                    <span id='VF-X-Symbol' class="material-symbols-outlined"> close </span>
                </div>
                <div className='VF-Video-Details-Wrapper'>

                    <div className='VF-VD-Title-Wrapper'>
                        <p className='VF-CD-Title'>Details</p>
                    </div>

                    <div className='VF-CD-VT-Wrapper'>
                        <div className='VF-CD-VT-Input-Wrapper'>
                            <textarea className='VF-CD-VT-Input' type='text' value={title} placeholder='Title(required)' onChange={(e) => setTitle(e.target.value)} maxLength={100} />
                        </div>
                        <p className='VF-CD-VT-Count'>{`${title.length}/100`}</p>
                    </div>

                    <div className='VF-CD-VD-Wrapper'>
                        <div className='VF-CD-VD-Input-Wrapper'>
                            <textarea className='VF-CD-VD-Input' type='text' value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} maxLength={1000} />
                        </div>
                        <p className='VF-CD-VD-Count'>{`${description.length}/1000`}</p>
                    </div>

                    <div className='VF-CD-VUrl-Wrapper'>
                        <div className='VF-CD-VUrl-Input-Wrapper'>
                            <input className='VF-CD-VUrl-Input' type='text' value={video} placeholder='Video Url' onChange={(e) => setVideo(e.target.value)} maxLength={1000} />
                        </div>
                    </div>

                    <div className='VF-CD-VThumbnail-Wrapper'>
                        <div className='VF-CD-VThumbnail-Input-Wrapper'>
                            <input className='VF-CD-VThumbnail-Input' type='text' value={thumbnail} placeholder='Thumbnail Url' onChange={(e) => setThumbnail(e.target.value)} maxLength={1000} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='VF-Right-Wrapper'>
                <div className='VF-Preview-Wrapper'>
                    <div className='VF-Player-Wrapper'>
                        <ReactPlayer
                            url={video}
                            controls={true}
                            width={300}
                            height={200}
                        />
                    </div>
                </div>
            </div>


            <div className='VF-Footer'>
                <div className='VF-Footer-Submit' onClick={((e) => '')}>Upload</div>
            </div>
        </div>
    )
}

export default VideoForm;