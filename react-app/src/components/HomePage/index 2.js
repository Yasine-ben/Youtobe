import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { thunkAllVideos } from '../../store/video';

import './HomePage.css'

function HomePage(){
    const dispatch = useDispatch()
    const history = useHistory()
    const videos = Object.values(useSelector(state => state.videos.allVideos))

    // console.log(videos)

    // maybe add clean up in useEffect
    useEffect(() => {
        dispatch(thunkAllVideos())
    },[dispatch])

    return(
        <div className='HP-Wrapper'>
            {videos.map((video, idx) => (
                <div key={`Video_${idx}`} className='HP-Video-Wrapper' onClick={((e) => history.push(`/Videos/${video.title}/${video.id}`))}>
                    <div className='HP-Thumbnail-Wrapper'>
                        <img src={video.thumbnail} alt='thumbnail alt' className='HP-Thumbnail'/>
                    </div>
                    <div className='HP-Title-Wrapper'>
                        <p className='HP-Title'>{video.title}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HomePage