import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { thunkAllVideos, thunkDeleteVideo, thunkSingleVideo } from '../../store/video';
import ReactPlayer from 'react-player';
import dayjs from 'dayjs';

import './SingleVideoPage.css'
import { thunkAllComments } from '../../store/comments';

function SingleVideoPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { video_id } = useParams();

    //import dayjs from 'dayjs' // ES 2015
    const dayjs = require('dayjs')
    let relativeTime = require('dayjs/plugin/relativeTime')
    dayjs().format()

    dayjs.extend(relativeTime)



    const video = Object.values(useSelector(state => state.videos?.singleVideo))[0]
    const allVideos = Object.values(useSelector(state => state.videos?.allVideos))
    const user = useSelector(state => state.session?.user)
    const comments = Object.values(useSelector(state => state.comments?.allComments))


    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [discription, setDescription] = useState('')
    const [date, setDate] = useState('')
    // console.log(video)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

    //randomizes video order
    allVideos.sort(() => Math.random() - 0.5);



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
            setDate(video.updated_at)
        }
    }, [video])

    // console.log(dayjs(date).fromNow())

    useEffect(() => {
        dispatch(thunkSingleVideo(video_id))
        dispatch(thunkAllVideos())
        dispatch(thunkAllComments(video_id))
    }, [dispatch, user])

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(thunkDeleteVideo(video_id))
        history.push('/')
    }

    return (
        <div className='VP-Wrapper'>
            <div className='VP-Left-Wrapper'>
                {/* VIDEO PLAYER LEFT */}
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
                            <div className='VP-Creator-Img-Wrapper'>
                                <img className='VP-Creator-Img' src={video?.cover_image} alt='creatorImg' />
                            </div>
                            <div className='VP-CreatorName-Wrapper'>
                                <p className='VP-CreatorName'>{video?.uploader}</p>
                                <p className='VP-Subscribers'>{`${randomInRange(1, 100)} subscribers`}</p>
                            </div>
                        </div>
                        <div className='VP-Buttons-Wrapper'>
                            {(user?.id === video?.user_id) && (
                                <div className='VP-Buttons'>
                                    <div className='VP-UpdateBtn'>Update</div>
                                    <div className='VP-DeleteBtn' onClick={(e) => handleDelete(e)}>Delete</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='VP-DescriptionBox-Wrapper'>
                    <div className='VP-Desc-ViewsAndTime'>
                        <p className='VP-Desc-Views'>{`${randomInRange(1, 100)} views`}&nbsp;</p>
                        <p className='VP-Desc-Time'>{dayjs(date).fromNow()}</p>
                    </div>
                    <div className='VP-Description-Wrapper'>
                        <p className='VP-Description'>{discription}</p>
                    </div>
                </div>


                {/* CREATE COMMENT */}
                <div className='VP-Comments-Wrapper'>
                    <div className='VP-AddComments-Wrapper'>
                        <div className='VP-Comments-UserIcon'>
                            <i className="fa-solid fa-circle-user"></i>
                        </div>
                        <div className='VP-InputAndButtons-Wrapper'>
                            <div className='VP-Input-Wrapper'>
                                <input className='VP-Comment-Input' type="text" placeholder='Add a Comment...' id="Comment-Box" name="Comment-Box" required minLength="1" maxLength="10000" />
                            </div>
                            <div className='VP-CommentInputButton-Wrapper'>
                                <div className='VP-Submit'>
                                    <p>Comment</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* USER COMMENTS */}
                    <div className='VP-UC-Main-Wrapper'>
                        {/* THIS TERNARY DOESNT WORK */}
                        {!(comments.status === 404) ? comments.map((comment, idx) => (
                            <div key={`Comment_${idx}`} className='VP-UC-Card-Wrapper'>
                                <div className='VP-UC-Icon-Wrapper'>
                                    <i id='VP-UC-Icon' className="fa-solid fa-circle-user"></i>
                                </div>
                                <div className='VP-UC-RightBox-Wrapper'>
                                    <div className='VP-UC-Commenter-Wrapper'>
                                        <p className='VP-UC-Commenter'>{comment.user_name}</p>
                                        <p className='VP-UC-Time'>{dayjs(comment.updated_at).fromNow()}</p>
                                    </div>
                                    <div className='VP-UC-Comment-Wrapper'>
                                        <p className='VP-UC-Comment'>{comment.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                            :
                            <div className='VP-UC-NoComments-Wrapper'>
                                <p className='VP-UC-NoComment-Title'>No Comments Yet</p>
                            </div>}
                    </div>
                </div>
            </div>


            {/* RECOMENDED VIDEOS RIGHT SIDE */}
            <div className='VP-Right-Wrapper'>
                <div className='VP-Recomended-Wrapper'>
                    {allVideos.map((video, idx) => (
                        <div key={`Recomended_${idx}`} className='VP-Rec-Card-Wrapper'>
                            <div className='VP-Rec-Container'>
                                <div className='VP-Rec-Img-Wrapper'>
                                    <img src={video.thumbnail} alt='recomeneded thumbnail' className='VP-Recomended-Img' />
                                </div>
                                <div className='VP-Rec-Text-Wrapper'>
                                    <div className='VP-Rec-Title-Wrapper'>
                                        <p className='VP-Rec-Title'>{video.title}</p>
                                    </div>
                                    <div className='VP-Rec-Uploader-Wrapper'>
                                        <p className='VP-Rec-Uploader'>{video?.uploader}</p>
                                    </div>
                                    <div className='VP-Rec-ViewsAndTime-Wrapper'>
                                        <p className='VP-Rec-Views'>{`${randomInRange(1, 100)} views`}&nbsp;</p>
                                        <p className='VP-Rec-Time'>•&nbsp;{dayjs(video.updated_at).fromNow()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SingleVideoPage;