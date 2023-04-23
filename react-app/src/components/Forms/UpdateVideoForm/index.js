import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../../context/Modal";
import './UpdateVideoForm.css'
import { thunkEditVideo } from '../../../store/video';


function UpdateVideoForm({ video_id }) {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()

        const err = {}
        if (title.length < 1) err.title = 'Title must be filled in'
        if (title.length > 100) err.title = 'Title must be less than 101 character in length'

        if (description.length < 1) err.description = 'Description must be filled in'
        if (description.length > 1000) err.description = 'Description must be less than 1001 characters in length'
        
        if (!isValidUrl(thumbnail)) err.thumbnail = 'Thumbnail Url must be a valid url'
        if (!isImageUrl(thumbnail)) err.thumbnail = 'Thumbnail url must lead to an image'

        if (!Object.values(err).length) {
            setErrors(err)
            const data = await dispatch(thunkEditVideo(video_id, title, description, thumbnail));

            if (data) {
                // console.log('SERVER ERRORS')
                // console.log(data)
            }
            else {
                // console.log("SUBMITTED")
                closeModal()
            }

            return
        } else {
            setErrors(err)
            // console.log(err)
            // console.log('FRONT END ERROR FRONT END ERROR')
            return
        }
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
        sessionUser && (
            <div className="UVF-Wrapper">
                <div className='UVF-TopBar'>
                    <p className='UVF-Title'>Edit Video Details</p>
                    <span onClick={(e) => { closeModal() }} id='UVF-X-Symbol' className="material-symbols-outlined"> close </span>
                </div>
                <div className='UVF-Video-Details-Wrapper'>

                    <div className='UVF-VD-Title-Wrapper'>
                        <p className='UVF-CD-Title'>Video Details</p>
                    </div>

                    <div className='UVF-CD-VT-Wrapper'>
                        <div className='UVF-CD-VT-Input-Wrapper'>
                            <textarea className='UVF-CD-VT-Input' type='text' value={title} placeholder='Title(required)' onChange={(e) => setTitle(e.target.value)} maxLength={100} />
                        </div>
                        <p className='UVF-CD-VT-Count'>{`${title.length}/100`}</p>
                    </div>

                    <div className='UVF-CD-VD-Wrapper'>
                        <div className='UVF-CD-VD-Input-Wrapper'>
                            <textarea className='UVF-CD-VD-Input' type='text' value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} maxLength={1000} />
                        </div>
                        <p className='UVF-CD-VD-Count'>{`${description.length}/1000`}</p>
                    </div>

                    <div className='UVF-CD-VThumbnail-Wrapper'>
                        <div className='UVF-CD-VThumbnail-Input-Wrapper'>
                            <input className='UVF-CD-VThumbnail-Input' type='text' value={thumbnail} placeholder='Thumbnail Url' onChange={(e) => setThumbnail(e.target.value)} maxLength={1000} />
                        </div>
                    </div>
                </div>

                <div className='UVF-Errors-Wrapper'>
                    {Boolean(Object.values(errors).length) && (<p>Errors</p>)}
                    {Object.values(errors).map((error, idx) => (
                        <p className='UVF-Errors' key={idx}>{`* ${error}`}</p>
                    ))}
                </div>

                <div className='UVF-Footer'>
                    <div className='UVF-Footer-Submit' onClick={((e) => handleSubmit(e))}>Upload</div>
                </div>
            </div>)
    )
}

export default UpdateVideoForm