import { useState, useRef } from 'react';
import './VideoForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import uploadGuy from '../../../Images/Upload.svg'
import { thunkAllVideos, thunkUploadVideo } from '../../../store/video';
import { useModal } from "../../../context/Modal";
import { useDropzone } from 'react-dropzone';
import loading from '../../../Images/loading.gif'

function VideoForm() {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const playerRef = useRef(null);
    const { closeModal } = useModal();

    const [title, setTitle] = useState('')
    const [slide, setSlide] = useState(0)
    const [description, setDescription] = useState('')
    const [video, setVideo] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({})

    const imageFormat = [
        ".jpg", ".jpeg", ".png", ".gif",
        ".bmp", ".tiff", ".psd", ".ai",
        ".eps", ".svg", ".pdf", ".ico",
        ".raw", ".webp"
    ];
    const videoFormat = [
        ".mp4",
        ".mov",
        ".avi",
        ".mkv",
        ".wmv",
        ".flv",
        ".webm",
        ".m4v",
    ];
    const handleThumbnailFileChange = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (isImageFile(file)) {
            setThumbnail(file);
            delete errors.thumbnail
        }
        else return errors.thumbnail = 'not a valid image file'

        // Read the file for preview
        const reader = new FileReader();
        reader.onload = (event) => {
            // Set the file preview as data URL
            setThumbnailPreview(event.target.result);
        };
        reader.readAsDataURL(file);
    };
    const handleVideoFileChange = (acceptedFiles) => {
        const file = acceptedFiles[0];

        if (isVideoFile(file)) {
            setVideo(file);
            delete errors.video
        }
        else return errors.video = 'not a valid video file'

        // Read the file for preview
        const reader = new FileReader();
        reader.onload = (event) => {
            // Set the file preview as data URL
            setVideoPreview(event.target.result);
        };
        reader.readAsDataURL(file);
    };
    function isVideoFile(videoFile) {
        if (!videoFormat?.some(ext => videoFile?.name.endsWith(ext))) {
            return false
        } else {
            return true
        }
    }
    function isImageFile(imageFile) {
        if (!imageFormat?.some(ext => imageFile?.name.endsWith(ext))) {
            return false
        }
        else if (imageFile?.name.endsWith('.HEIC')) {
            errors.thumbnail = ('HEIC')
        }
        else {
            return true
        }
    }
    const isFormValid = () => {
        return (
            title.trim().length > 0 &&
            description !== null &&
            thumbnail !== null &&
            video !== null
        );
    };
    const {
        getRootProps: getThumbnailRootProps,
        getInputProps: getThumbnailInputProps,
        isDragActive: isThumbnailDragActive,
        isDragAccept: isThumbnailDragAccept,
        isDragReject: isThumbnailDragReject
    } = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop: handleThumbnailFileChange
    });
    const {
        getRootProps: getVideoRootProps,
        getInputProps: getVideoInputProps,
        isDragActive: isVideoDragActive,
        isDragAccept: isVideoDragAccept,
        isDragReject: isVideoDragReject
    } = useDropzone({
        accept: 'video/mp4, video/mov', // Update the accept property to accept video files
        onDrop: handleVideoFileChange
    });

    //SUBMIT LOGIC///////////////////////////////////////////////////////////////////////////////////////////////
    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = {}

        if (title.length < 1) err.title = 'Title must be filled in'
        if (title.length > 100) err.title = 'Title must be less than 101 character in length'

        if (description.length < 1) err.description = 'Description must be filled in'
        if (description.length > 1000) err.description = 'Description must be less than 1001 characters in length'

        const uploader = sessionUser.username
        const user_id = sessionUser.id

        if (!imageFormat?.some(ext => thumbnail?.name.endsWith(ext))) {
            err.thumbnail = 'Please provide a valid image file';
        } else if (thumbnail?.name.endsWith('.HEIC')) {
            err.thumbnail = ('HEIC')
        }

        if (!videoFormat?.some(ext => video?.name.endsWith(ext))) {
            err.video = 'Please provide a valid audio file';
        }

        if (!uploader || !user_id) err.user = 'You Must Be Logged In'

        if (!Object.values(err).length) {
            setErrors(err)
            const formData = new FormData();

            formData.append('title', title);
            formData.append('description', description);
            formData.append('video', video);
            formData.append('thumbnail', thumbnail);
            formData.append('uploader', sessionUser.username);
            formData.append('user_id', sessionUser.id);

            const res = await fetch('/api/videos/createVideo', {
                method: "POST",
                body: formData
            });
            if (res.ok) {
                closeModal();
                dispatch(thunkAllVideos);
                return history.push('/');
            } else {
                // setLoading('hidden')
                err.submit = 'Error with submission please try again'
                setErrors(err)
            }
        } else {
            return setErrors(err)
        }
    }
    //SUBMIT LOGIC///////////////////////////////////////////////////////////////////////////////////////////////


    return (
        sessionUser && (
            <div className='VF-Wrapper'>
                <div className='VF-Left-Wrapper'>
                    <div className='VF-TopBar'>
                        <p className='VF-Title'>Upload Video</p>
                        <span onClick={(e) => { closeModal() }} id='VF-X-Symbol' className="material-symbols-outlined"> close </span>
                    </div>
                    <form className='VF-Video-Details-Wrapper' onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
                        {errors.titleLength ? <div className="">* {errors.titleLength}</div> : null}

                        <div className='VF-VD-Title-Wrapper'>
                            <p className='VF-CD-Title'>Video Details</p>
                        </div>

                        <div className='VF-CD-VT-Wrapper'>
                            <div className='VF-CD-VT-Input-Wrapper'>
                                Video Title
                                <textarea
                                    type="text"
                                    name="videoTitle"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    placeholder="Title"
                                    className="VF-CD-VT-Input"
                                    minLength={1}
                                    maxLength={100}
                                />
                            </div>
                            <p className='VF-CD-VT-Count'>{`${title.length}/100`}</p>
                            {errors.title && <p className="">{errors.title}</p>}
                        </div>

                        <div className='VF-CD-VD-Wrapper'>
                            <div className='VF-CD-VD-Input-Wrapper'>
                                Video Description
                                <textarea
                                    type="text"
                                    name="videoDescription"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    placeholder="Description"
                                    className="VF-CD-VD-Input"
                                    minLength={1}
                                    maxLength={1000}
                                />
                            </div>
                            <p className='VF-CD-VD-Count'>{`${description.length}/1000`}</p>
                            {errors.description && <p className="">{errors.description}</p>}
                        </div>
                        <div className='VF-CD-Dropzone-Wrapper'>
                            <div className="VF-CD-VTI-Wrapper">
                                <div {...getThumbnailRootProps({ className: `dropzone ${isThumbnailDragActive ? "active" : ""} ${isThumbnailDragAccept ? "accept" : ""} ${isThumbnailDragReject ? "reject" : ""}` })}>
                                    <input {...getThumbnailInputProps()} />
                                    {!isThumbnailDragActive && !thumbnailPreview && (<i className="fa-solid fa-image" id='CI-Cloud'></i>)}
                                    {!isThumbnailDragActive && !thumbnailPreview && !errors.thumbnail && (<p>Tap or drop an image here</p>)}
                                    {errors.thumbnail && <p className="" style={{ color: 'red' }}>Invalid file format for thumbnail image. Please upload a JPEG or PNG file.</p>}
                                    {thumbnailPreview && <div className=""><img src={thumbnailPreview} alt="Thumbnail Preview" className="" style={{ width: '200px' }} /></div>}
                                </div>
                            </div>

                            {<div className={"VF-CD-VVI-Wrapper"}>
                                <div {...getVideoRootProps({ className: `dropzone ${isVideoDragActive ? "active" : ""} ${isVideoDragAccept ? "accept" : ""} ${isVideoDragReject ? "reject" : ""}` })}>
                                    <input {...getVideoInputProps()} />
                                    {!isVideoDragActive && !videoPreview && (<i className="fa-solid fa-video" id='CI-Cloud'></i>)}
                                    {!isVideoDragActive && !videoPreview && !errors.video && (<p>Tap or drop your video here</p>)}
                                    {errors.video && <p className="" style={{ color: 'red' }}>Invalid file format for Video file. Please upload an mp4 file.</p>}
                                    
                                </div>{videoPreview && <div className='VF-Player-Wrapper'>
                                        <ReactPlayer
                                            ref={playerRef}
                                            url={videoPreview}
                                            controls={true}
                                        />
                                    </div>}
                            </div>}
                        </div>
                    </form>
                </div>

                <div className='VF-Errors-Wrapper'>
                    {Boolean(Object.values(errors).length) && (<p>Errors</p>)}
                    {Object.values(errors).map((error, idx) => (
                        <p className='VF-Errors' key={idx}>{`* ${error}`}</p>
                    ))}
                </div>

                {/* <div className='VF-Img-Wrapper'>
                    <img className='VF-Img' src={uploadGuy} alt='upload guy' />
                </div> */}

                <div className='VF-Footer'>
                    <button className='VF-Footer-Submit' type="submit" disabled={!isFormValid()} onClick={((e) => handleSubmit(e))}>Upload</button>
                    {isLoading && <img src={loading} alt='loading-gif' className={'loading'} />}
                </div>

            </div>
        )
    )
}

export default VideoForm;

// const handleSubmit = async (e) => {
//     e.preventDefault();
    // const err = {}
    // if (title.length < 1) err.title = 'Title must be filled in'
    // if (title.length > 100) err.title = 'Title must be less than 101 character in length'

    // if (description.length < 1) err.description = 'Description must be filled in'
    // if (description.length > 1000) err.description = 'Description must be less than 1001 characters in length'

    // if (!isValidUrl(video)) err.video = 'Video Url Must be a valid Url'
    // if (!isValidUrl(thumbnail)) err.thumbnail = 'Thumbnail Url must be a valid url'

    // const uploader = sessionUser.username
    // const user_id = sessionUser.id

    // if (!uploader || !user_id) err.user = 'You Must Be Logged In'

    // if (!length) err.length = 'Video url is invalid'

    // if (!isImageUrl(thumbnail)) err.thumbnail = 'Thumbnail url must lead to an image'

    // if (!Object.values(err).length) {
    //     setErrors(err)
    //     const data = await dispatch(thunkUploadVideo(title, description, video, length, thumbnail, uploader, user_id));

    //     if (data) {
    //         // console.log('SERVER ERRORS')
    //         // console.log(data)
    //     }
    //     else {
    //         // console.log("SUBMITTED")
    //         closeModal()
    //         history.push('/')

    //     }

    //     return
    // } else {
    //     setErrors(err)
    //     // console.log(err)
    //     // console.log('FRONT END ERROR FRONT END ERROR')
    //     return
    // }


// }

// function handleReady() {
//     let len = (playerRef.current.getDuration());
//     len = (len / 60).toFixed(2)
//     setLength(Number(len))
// }

// function isValidUrl(string) {
//     try {
//         new URL(string);
//         return true;
//     } catch (_) {
//         return false;
//     }
// }

// function isImageUrl(url) {
//     const imageExtensions = /\.(jpg|jpeg|png|gif)$/i;
//     return imageExtensions.test(url);
// }