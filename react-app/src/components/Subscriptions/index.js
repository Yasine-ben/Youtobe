import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { thunkAllVideos, thunkAllVideosRand, thunkVideoSubscription } from '../../store/video';
import normalizeViews from '../../helpers/normalizeViews';
import ad from '../../Images/PMAd.png'

import './Subscriptions.css'

function Subscriptions() {
    const dispatch = useDispatch()
    const history = useHistory()
    const videos = Object.values(useSelector(state => state.videos.allVideos))

    const [isLoaded, setIsLoaded] = useState(false)

    //import dayjs from 'dayjs' // ES 2015
    const dayjs = require('dayjs')
    let relativeTime = require('dayjs/plugin/relativeTime')
    dayjs().format()

    dayjs.extend(relativeTime)

    // maybe add clean up in useEffect
    useEffect(() => {
        const fetchData = async () => {
            setIsLoaded(false)
            dispatch(thunkVideoSubscription())
            setIsLoaded(true)
        }
        fetchData();
    }, [dispatch])

    function formatDate(date) {
        return dayjs(new Date(date)).fromNow();
    }

    return (
        (!isLoaded) ? <div className='LOADING-SCREEN'></div> :

            (
                <>
                
                    <div className='HP-Wrapper'>
                    <p className='SUB-Title' style={{color:'white'}}>Subscriptions</p>
                        {videos.map((video, idx) => (
                            <div key={`Video_${idx}`} className='HP-Video-Wrapper' onClick={((e) => history.push(`/Videos/${video.id}`))}>
                                <div className='HP-Thumbnail-Wrapper'>
                                    <img src={video.thumbnail} alt='thumbnail alt' className='HP-Thumbnail' />
                                </div>
                                <div className='HP-Lower-Wrapper'>
                                    <div className='HP-Uploader-Img-Wrapper'>
                                        <img className='HP-Uploader-Img' src={video.cover_image} alt='Upl' />
                                    </div>
                                    <div className='HP-Text-Wrapper'>
                                        <div className='HP-Title-Wrapper'>
                                            <p className='HP-Title'>{video.title}</p>
                                        </div>
                                        <div className='HP-Uploader-Name-Wrapper'>
                                            <img />
                                            <p className='HP-Uploader-Name'>{video.uploader}</p>
                                        </div>
                                        <div className='HP-ViewsAndTime-Wrapper'>
                                            <div className='HP-Views-Wrapper'>
                                                <p className='HP-Views'>{`${normalizeViews(video.views)} views`}</p>
                                                <p className='HP-Time'>&nbsp;•&nbsp;{formatDate(video.created_at)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>)
    )
}

export default Subscriptions