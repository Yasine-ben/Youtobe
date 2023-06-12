import { useDispatch, useSelector } from 'react-redux';
import './MyVideos.css'
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { thunkAllUserVideos } from '../../store/video';

import styles from './page1.module.css'

function MyVideos() {
    const history = useHistory()
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const videos = Object.values(useSelector(state => state.videos.userVideos))
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoaded(false);
            dispatch(thunkAllUserVideos(sessionUser.id))
            setIsLoaded(true);
        };
        fetchData();
    }, [dispatch])

    useEffect(() => {
        document.body.classList.add(styles.newBody);
        return () => {
            document.body.classList.remove(styles.newBody);
        };
    }, []);


    // console.log('VIDEOS VIDEOS VIDEOS', videos)
    // console.log(sessionUser)

    if (!sessionUser) history.push('/')
    return (
        (isLoaded && sessionUser && videos && <div className='MV-Wrapper'>
            <div className='MV-Left-Wrapper'>
                <div className='MV-Left-Top'>
                    <div className='MV-Left-Img-Wrapper'>
                        <img className='MV-Left-Img' src={sessionUser.cover_image} alt='user img' />
                    </div>
                    <p className='MV-YourChannel'>Your Channel</p>
                    <p className='MV-ChannelName'>{`${sessionUser.first_name} ${sessionUser.last_name}`}</p>
                </div>

                <div className='MV-Left-Bottom'>
                    <div className='MV'>

                    </div>
                </div>

            </div>

            {/* {videos.length ? */}
            <div className='MV-Right-Wrapper'>
                <div className='MV-R-Title-Wrapper'>
                    <p className='MV-R-Title'>Channel content</p>
                </div>
                <div className='MV-Videos-Wrapper'>
                    <div className="MV-Bottom-Title-Header">
                        <div className="MV-Video-Header"> <p className="MV-Bottom-text">Video</p> </div>
                        <div className="MV-Title-Header"> <p className="MV-Bottom-text" id="MV-Bottom-Time-text">Title</p> </div>
                        {/* <div className="MV-Comments-Header"> <p className="MV-Bottom-text" id="MV-Bottom-Time-text">Comments</p> </div> */}
                        <div className="MV-Date-Header"> <p className="MV-Bottom-text" id="MV-Bottom-Time-text">Date</p> </div>
                    </div>
                    {videos.map((video, idx) => (
                        <div key={`myVideos-${idx}`} className='MV-Video-Block-Wrapper'>

                            <div className='MV-Video-Thumbnail-Wrapper' onClick={(e) => history.push(`/Videos/${video.id}`)}>
                                <img className='MV-Video-Thumbnail' src={video.thumbnail} alt="thumbnail" />
                            </div>

                            <div className='MV-Video-TitleAndDescription-Wrapper'>
                                <div className='MV-Video-Title-Wrapper'>
                                    <p className='MV-Video-Title'>{video.title}</p>
                                </div>
                                <div className='MV-Video-Edit-Wrapper'>

                                </div>
                            </div>
                            {/* <div className='MV-Video-Comments-Wrapper'>
                                <p className='MV-Video-Comments'>{ }</p>
                            </div> */}
                            <div className='MV-Video-Date-Wrapper'>
                                <p className='MV-Video-Date'>{video.created_at}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* // :
            // <div className='MV-Right-Wrapper'>
            //     <div className='MV-NoVideos'>UPLOAD VIDEO</div>
            // </div>} */}

        </div>)
    )
}

export default MyVideos;