import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { thunkAllVideos, thunkSingleVideo } from '../../store/video';
import ReactPlayer from 'react-player';

import './SingleVideoPage.css'

function SingleVideoPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { video_id } = useParams();
    const video = Object.values(useSelector(state => state.videos.singleVideo))[0]
    const allVideos = Object.values(useSelector(state => state.videos.allVideos))
    const user = useSelector(state => state.session.user)

    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [discription, setDescription] = useState('')
    // add views and createdAt/updatedAt
    // console.log(video)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (video) {
            setUrl(video.video)
            setTitle(video.title)
            setDescription(video.description)
        }
    }, [video])

    useEffect(() => {
        dispatch(thunkSingleVideo(video_id))
        dispatch(thunkAllVideos())
    }, [dispatch, user])

    return (
        <div className='VP-Wrapper'>
            <div className='VP-Left-Wrapper'>
                <div className='VP-Player-Wrapper'>
                    <ReactPlayer
                        url={url}
                        controls={true}
                        className='VP-Player'
                        width={1180}
                        height={720}
                    // onEnded={((e) => '')}
                    />
                </div>
                <div className='VP-UnderPlayer-Wrapper'>
                    <div className='VP-Title-Wrapper'>
                        <p className='VP-Title'>{title}</p>
                    </div>
                    <div className='VP-Lower-Wrapper'>
                        <div className='VP-Creator-Wrapper'>

                        </div>
                        <div className='VP-'>

                        </div>
                    </div>
                </div>
                <div className='VP-DescriptionBox-Wrapper'>

                </div>
            </div>
            
            <div className='VP-Right-Wrapper'>
                <div className='VP-Recomended-Wrapper'>
                    {allVideos.map((video, idx) => (
                        <div key={`Recomended_${idx}`} className='VP-Rec-Card-Wrapper'>
                            <img src={video.thumbnail} alt='recomeneded thumbnail' className='VP-Recomended-Img' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SingleVideoPage;