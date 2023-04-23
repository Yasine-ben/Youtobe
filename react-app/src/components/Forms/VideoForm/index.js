import { useState, useRef } from 'react';
import './VideoForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import uploadGuy from '../../../Images/Upload.svg'
import { thunkUploadVideo } from '../../../store/video';
import { useModal } from "../../../context/Modal";

function VideoForm() {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const playerRef = useRef(null);
    const { closeModal } = useModal();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [video, setVideo] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [length, setLength] = useState(1.50)
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = {}
        if (title.length < 1) err.title = 'Title must be filled in'
        if (title.length > 100) err.title = 'Title must be less than 101 character in length'

        if (description.length < 1) err.description = 'Description must be filled in'
        if (description.length > 1000) err.description = 'Description must be less than 1001 characters in length'

        if (!isValidUrl(video)) err.video = 'Video Url Must be a valid Url'
        if (!isValidUrl(thumbnail)) err.thumbnail = 'Thumbnail Url must be a valid url'

        const uploader = sessionUser.username
        const user_id = sessionUser.id

        if (!uploader || !user_id) err.user = 'You Must Be Logged In'

        if (!length) err.length = 'Video url is invalid'

        if (!isImageUrl(thumbnail)) err.thumbnail = 'Thumbnail url must lead to an image'
        
        if (!Object.values(err).length) {
            setErrors(err)
            const data = await dispatch(thunkUploadVideo(title, description, video, length, thumbnail, uploader, user_id));

            if (data) {
                // console.log('SERVER ERRORS')
                // console.log(data)
            }
            else {
                // console.log("SUBMITTED")
                closeModal()
                history.push('/')
                
            }

            return
        } else {
            setErrors(err)
            // console.log(err)
            // console.log('FRONT END ERROR FRONT END ERROR')
            return
        }

    }

    function handleReady() {
        let len = (playerRef.current.getDuration());
        len = (len / 60).toFixed(2)
        setLength(Number(len))
    }

    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    function isImageUrl(url) {
        const imageExtensions = /\.(jpg|jpeg|png|gif)$/i;
        return imageExtensions.test(url);
    }

    return (
        sessionUser && (<div className='VF-Wrapper'>
            <div className='VF-Left-Wrapper'>
                <div className='VF-TopBar'>
                    <p className='VF-Title'>Upload Video</p>
                    <span onClick={(e) => {closeModal()}} id='VF-X-Symbol' className="material-symbols-outlined"> close </span>
                </div>
                <div className='VF-Video-Details-Wrapper'>

                    <div className='VF-VD-Title-Wrapper'>
                        <p className='VF-CD-Title'>Video Details</p>
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
                            ref={playerRef}
                            url={video}
                            controls={true}
                            width={300}
                            height={200}
                            onReady={handleReady}
                        />
                    </div>
                </div>
            </div>

            <div className='VF-Errors-Wrapper'>
                {Boolean(Object.values(errors).length) && (<p>Errors</p>)}
                {Object.values(errors).map((error, idx) => (
                    <p className='VF-Errors' key={idx}>{`* ${error}`}</p>
                ))}
            </div>

            <div className='VF-Img-Wrapper'>
                <img className='VF-Img' src={uploadGuy} alt='upload guy' />
            </div>

            <div className='VF-Footer'>
                <div className='VF-Footer-Submit' onClick={((e) => handleSubmit(e))}>Upload</div>
            </div>
        </div>)
    )
}

export default VideoForm;