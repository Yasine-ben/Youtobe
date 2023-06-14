import { useState, useRef, useDebugValue, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../../context/Modal";
import './UpdateVideoForm.css'
import { thunkEditVideo, thunkSingleVideo } from '../../../store/video';


function UpdateVideoForm({ video_id }) {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const video = Object.values(useSelector(state => state.videos?.singleVideo))[0]
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    console.log(video)
    const [title, setTitle] = useState(video.title || '')
    const [description, setDescription] = useState(video.description || '')
    const [thumbnail, setThumbnail] = useState(video.thumbnail || '')
    const [errors, setErrors] = useState({})

    

    const handleSubmit = async (e) => {
        e.preventDefault()

        const err = {}
        if (title.length < 1) err.title = 'Title must be filled in'
        if (title.length > 100) err.title = 'Title must be less than 101 character in length'

        if (description.length < 1) err.description = 'Description must be filled in'
        if (description.length > 1000) err.description = 'Description must be less than 1001 characters in length'


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