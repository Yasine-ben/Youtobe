import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { thunkAllVideos } from '../../store/video';

import './HomePage.css'

function HomePage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const videos = Object.values(useSelector(state => state.videos.allVideos))

    const [isLoaded, setIsLoaded] = useState(false)

    //import dayjs from 'dayjs' // ES 2015
    const dayjs = require('dayjs')
    let relativeTime = require('dayjs/plugin/relativeTime')
    dayjs().format()

    dayjs.extend(relativeTime)

    // console.log(videos)

    function randomInRange(min, max) {
        const SUFFIXES = 'KM'
        let randNum = Math.floor(Math.random() * (max - min + 1) + min);
        let randPicker = Math.floor(Math.random() * (3 - 1 + 1) + 1)
        switch (randPicker) {
            case 1:
                return (randNum + SUFFIXES[0])
            case 2:
                return (randNum + SUFFIXES[1])
            case 3:
                return (randNum.toString())
        }
    }

    // maybe add clean up in useEffect
    useEffect(() => {
        const fetchData = async () => {
            setIsLoaded(false)
            dispatch(thunkAllVideos())
            setIsLoaded(true)
        }
        fetchData();
    }, [dispatch])

    return (
        (!isLoaded) ? <div className='LOADING-SCREEN'></div> :
        (<div className='HP-Wrapper'>
            {videos.map((video, idx) => (
                <div key={`Video_${idx}`} className='HP-Video-Wrapper' onClick={((e) => history.push(`/Videos/${video.title}/${video.id}`))}>
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
                                <p className='HP-Uploader-Name'>{video.uploader}</p>
                            </div>
                            <div className='HP-ViewsAndTime-Wrapper'>
                                <div className='HP-Views-Wrapper'>
                                    <p className='HP-Views'>{`${randomInRange(1, 100)} views`}</p>
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

export default HomePage