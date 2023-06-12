import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { thunkAllVideos, thunkAllVideosRand } from '../../store/video';
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
            dispatch(thunkAllVideosRand())
            setIsLoaded(true)
        }
        fetchData();
    }, [dispatch])

    return (
        (!isLoaded) ? <div className='LOADING-SCREEN'></div> :
            (<div className='HP-Wrapper'>
                <a className='HP-Video-Wrapper-Ad' href='https://pearmusic.onrender.com/'>
                    <div className='HP-Thumbnail-Wrapper'>
                        <img src={ad} alt='thumbnail alt' className='HP-Thumbnail' />
                        <span id='ad-External' className="material-symbols-outlined"> open_in_new </span>
                    </div>
                    <div className='HP-Lower-Wrapper-Ad'>
                        <div className='HP-Text-Wrapper-Ad'>
                            <div className='HP-Title-Wrapper-Ad'>
                                <p className='HP-Title-Ad'>{'Try Pear Music Today'}</p>
                            </div>
                            <div className='HP-Uploader-Name-Wrapper-Ad'>
                                <p className='HP-Uploader-Name-Ad'>Start streaming today with a free one-month trial of Pear Music and cancel anytime.*</p>
                            </div>
                            <div className='HP-ViewsAndTime-Wrapper-Ad'>
                                <div className='HP-Views-Wrapper-Ad'>
                                    <p style={{ color: 'white' }} className='HP-Views'>{`Ad`}</p>
                                    <p style={{ color: 'grey' }}>&nbsp;•&nbsp;</p>
                                    <p style={{ color: 'grey' }}>Pear Music</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
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
                                        <p className='HP-Time'>&nbsp;•&nbsp;{dayjs(video.updated_at).fromNow()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>)
    )
}

export default Subscriptions